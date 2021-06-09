import AceEditor from 'react-ace';
import React, { Component } from 'react';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-objectivec';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/ext-code_lens';
import 'ace-builds/src-noconflict/ext-elastic_tabstops_lite';
import 'ace-builds/src-noconflict/ext-emmet';
import 'ace-builds/src-noconflict/ext-keybinding_menu';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-linking';
import 'ace-builds/src-noconflict/ext-modelist';
import 'ace-builds/src-noconflict/ext-options';
import 'ace-builds/src-noconflict/ext-prompt';
import 'ace-builds/src-noconflict/ext-rtl';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/ext-error_marker';
import 'ace-builds/src-noconflict/ext-themelist';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-kuroir';
import io from 'socket.io-client';
import { FaRegLightbulb } from 'react-icons/fa';
import { RiSunLine } from 'react-icons/ri';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';
import './textEditor.css'

const socket = io.connect('https://backenders-devecafe.herokuapp.com');

class TextEditor extends Component {
	constructor() {
		super();
		this.state = {
			code: '',
			codeUpdate: '',
			theme: 'twilight',
			language: 'javascript',
			output: '',
			modalShow: false,
		};
		this.onChange = this.onChange.bind(this);
		this.themeToggle = this.themeToggle.bind(this);
		this.changeLanguage = this.changeLanguage.bind(this);
		this.showValue = this.showValue.bind(this);
	}
	componentDidMount() {
		socket.on('code-update', (code) => {
			this.setState({ code: code });
		});
		socket.on('theme-update', (themeUpdate) => {
			this.setState({ theme: themeUpdate });
		});
		socket.on('language-update', (languageUpdated) => {
			this.setState({ language: languageUpdated });
		});
	}

	onChange(newValue, e) {
		this.setState({ code: newValue });
		socket.emit('codeText', this.state.code);
	}
	showValue() {
		const Api = `https://emkc.org/api/v2/piston/execute`;
		let ver;

		if(this.state.language === "javascript") ver = "15.10.0"
		if(this.state.language === "python") ver = "3.9.4"
		if(this.state.language === "java") ver = "15.0.2"
		if(this.state.language === "csharp") ver = "5.0.201"
		
		let obj = {
			language: this.state.language,
			version: ver,
			files: [
				{
					content: this.state.code,
				},
			],
		};
		axios.post(Api, obj).then((data) => {
			this.setState({ output: data.data.run.output });
			this.setState({modalShow:true})
		});
	}

	themeToggle() {
		if (this.state.theme === 'kuroir') {
			socket.emit('themeChange', 'twilight');
			this.setState({ theme: 'twilight' });
		} else {
			socket.emit('themeChange', 'kuroir');
			this.setState({ theme: 'kuroir' });
		}
	}

	changeLanguage(e) {
		socket.emit('languageChange', e.target.value);
		this.setState({ language: e.target.value });
	}

	render() {
		return (
			<div className="originCodeContainer">
				<div className="codeOptions">
					{this.state.theme === 'kuroir' ? (
						<FaRegLightbulb className="themeIcons" onClick={this.themeToggle} />
					) : (
						<RiSunLine className="themeIcons" onClick={this.themeToggle} />
					)}
					<Form.Control as="select" onChange={this.changeLanguage} value="language">
						<option>Language</option>
						<option value="javascript">Javascript</option>
						<option value="python">Python</option>
						<option value="c">C</option>
						<option value="java">Java</option>
						<option value="ruby">Ruby</option>
						<option value="csharp">Csharp</option>
					</Form.Control>
					<h3>{this.state.language.toUpperCase()}</h3>
					<Button onClick={this.showValue}>Run Code</Button>
				</div>
				<AceEditor
					placeholder="Start Coding ...."
					mode={this.state.language}
					theme={this.state.theme}
					name="blah2"
					onLoad={this.onLoad}
					onChange={this.onChange}
					fontSize={16}
					showPrintMargin={true}
					showGutter={true}
					highlightActiveLine={true}
					value={this.state.code}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					height= "91.2%"
					width="100%"
				/>


				<Modal
					show={this.state.modalShow}
					onHide={()=>(this.setState({modalShow:false}))}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header className="modalHeader" closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Code Output
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
					{this.state.output}
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default TextEditor;

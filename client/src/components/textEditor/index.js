// import React, { useState, useEffect, useRef } from 'react';
// import socketIOClient from 'socket.io-client';
// import Editor from '@monaco-editor/react';
// import { FaRegLightbulb } from 'react-icons/fa';
// import { RiSunLine } from 'react-icons/ri';

// let socket;

// const TextEditor = () => {
// 	const editorRef = useRef(null);
// 	const [code, setCode] = useState('');
// 	const [codeUpdate, setCodeUpdate] = useState('');
// 	const [theme, setTheme] = useState('vs-dark');
// 	const [language, setLanguage] = useState('javascript');

// 	useEffect(() => {
// 		socket = socketIOClient();
// 		socket.on('code-update', (code) => {
// 			setCodeUpdate(code);
// 		});
// 		socket.on('theme-update', (themeUpdate) => {
// 			setTheme(themeUpdate);
// 		});
// 		socket.on('language-update', (languageUpdated) => {
// 			setLanguage(languageUpdated);
// 		});
// 	}, []);

// 	useEffect(() => {
// 		socket.emit('codeText', code);
// 	}, [code]);

// 	useEffect(() => {
// 		socket.emit('themeChange', theme);
// 	}, [theme]);

// 	useEffect(() => {
// 		socket.emit('languageChange', language);
// 	}, [language]);

// 	/*===========================================================================================*/
// 	/*==================================== Functions ============================================*/

// 	const codeTransfer = (code) => {
// 		setCode(code);
// 	};
// 	const themeToggle = () => {
// 		setTheme(theme === 'light' ? 'vs-dark' : 'light');
// 	};
// 	const changeLanguage = (e) => {
// 		setLanguage(e.target.value);
// 	};
// 	const handleEditorMount = (editor, monaco) => {
// 		editorRef.current = editor;
// 	};
// 	const showValue = () => {
// 		alert(editorRef.current.getValue());
// 	};

// 	return (
// 		<div className="App">
// 			<p>Code Editor</p>
// 			{theme === 'light' ? (
// 				<FaRegLightbulb className="themeIcons" onClick={themeToggle} />
// 			) : (
// 				<RiSunLine className="themeIcons" onClick={themeToggle} />
// 			)}

// 			<button onClick={showValue}>Show Value</button>
// 			<select onChange={changeLanguage} value="language">
// 				<option>Language</option>
// 				<option value="javascript">Javascript</option>
// 				<option value="python">Python</option>
// 				<option value="c++">C++</option>
// 				<option value="c">C</option>
// 				<option value="java">Java</option>
// 				<option value="go">Go</option>
// 			</select>
// 			<h1>{language}</h1>

// 			<Editor
// 				height="90vh"
// 				theme={theme}
// 				defaultLanguage="javascript"
// 				language={language}
// 				defaultValue="// Start Coding ..."
// 				value={codeUpdate}
// 				onMount={handleEditorMount}
// 				loading="Loading..."
// 				onChange={codeTransfer}
// 			/>
// 		</div>
// 	);
// };

import AceEditor from 'react-ace';
import React, { Component } from 'react';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-objectivec";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/ext-code_lens";
import "ace-builds/src-noconflict/ext-elastic_tabstops_lite";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-keybinding_menu";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-linking";
import "ace-builds/src-noconflict/ext-modelist";
import "ace-builds/src-noconflict/ext-options";
import "ace-builds/src-noconflict/ext-prompt";
import "ace-builds/src-noconflict/ext-rtl";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/snippets/javascript"
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-themelist";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-kuroir"
import io from "socket.io-client";
import { FaRegLightbulb } from 'react-icons/fa';
import { RiSunLine } from 'react-icons/ri';
import axios from 'axios';

const socket = io.connect('http://localhost:5000');

class TextEditor extends Component {
	constructor() {
		super();
		this.state = {
			code: "",
			codeUpdate: "",
			theme: "twilight",
			language: "javascript",
			output:"",
		}
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
		socket.on("language-update", (languageUpdated) => {
			this.setState({ language: languageUpdated });
		});
	}

	onChange(newValue, e) {
		this.setState({ code: newValue })
		socket.emit('codeText', this.state.code);
	}
	showValue() {
		const Api = `https://emkc.org/api/v2/piston/execute`;

		let obj = {
			language: "js",
			version: "15.10.0",
			files: [
				{
					"content": this.state.code
				}
			]

		}
		axios.post(Api,obj).then((data) => {
			this.setState({output:data.data.run.output})
		})

	}

	themeToggle() {
		if (this.state.theme === 'kuroir') {
			socket.emit('themeChange', "twilight");
			this.setState({ theme: "twilight" });
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
			<div>
				{this.state.theme === "kuroir" ?
					<FaRegLightbulb className="themeIcons" onClick={this.themeToggle} />
					: <RiSunLine className="themeIcons" onClick={this.themeToggle} />
				}
				<button onClick={this.showValue}>Show Value</button>
				<select onChange={this.changeLanguage} value="language">
					<option>Language</option>
					<option value="javascript">Javascript</option>
					<option value="python">Python</option>
					<option value="c">C</option>
					<option value="java">Java</option>
					<option value="ruby">Ruby</option>
					<option value="csharp">Csharp</option>
				</select>
				<h1>{this.state.language}</h1>
				{/* <AceEditor
        value={this.state.code}
        mode={this.state.language}
        // theme={this.state.theme}
		theme="twilight"
		name="aceEditor"
	    // setReadOnly={true}
		placeholder="Start Coding..."
		enableBasicAutocompletion={true}
		enableLiveAutocompletion={true}
        onChange={this.onChange}
        style={{ height: '400px' }}
        // ref={instance => { this.ace = instance; }}
      /> */}
				<AceEditor
					placeholder="Start Coding ...."
					mode={this.state.language}
					theme={this.state.theme}
					name="blah2"
					onLoad={this.onLoad}
					onChange={this.onChange}
					fontSize={14}
					showPrintMargin={true}
					showGutter={true}
					highlightActiveLine={true}
					value={this.state.code}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
				/>
				<div>{this.state.output}</div>
			</div>
		);
	}
}

export default TextEditor;

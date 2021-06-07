import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { FaRegLightbulb } from 'react-icons/fa';
import { RiSunLine } from 'react-icons/ri';

let socket;

const TextEditor = () => {
	const editorRef = useRef(null);
	const [code, setCode] = useState('');
	const [codeUpdate, setCodeUpdate] = useState('');
	const [theme, setTheme] = useState('vs-dark');
	const [language, setLanguage] = useState('javascript');

	useEffect(() => {
		socket = socketIOClient();
		socket.on('code-update', (code) => {
			setCodeUpdate(code);
		});
		socket.on('theme-update', (themeUpdate) => {
			setTheme(themeUpdate);
		});
		socket.on('language-update', (languageUpdated) => {
			setLanguage(languageUpdated);
		});
	}, []);

	useEffect(() => {
		socket.emit('codeText', code);
	}, [code]);

	useEffect(() => {
		socket.emit('themeChange', theme);
	}, [theme]);

	useEffect(() => {
		socket.emit('languageChange', language);
	}, [language]);

	/*===========================================================================================*/
	/*==================================== Functions ============================================*/

	const codeTransfer = (code) => {
		setCode(code);
	};
	const themeToggle = () => {
		setTheme(theme === 'light' ? 'vs-dark' : 'light');
	};
	const changeLanguage = (e) => {
		setLanguage(e.target.value);
	};
	const handleEditorMount = (editor, monaco) => {
		editorRef.current = editor;
	};
	const showValue = () => {
		alert(editorRef.current.getValue());
	};

	return (
		<div className="App">
			<p>Code Editor</p>
			{theme === 'light' ? (
				<FaRegLightbulb className="themeIcons" onClick={themeToggle} />
			) : (
				<RiSunLine className="themeIcons" onClick={themeToggle} />
			)}

			<button onClick={showValue}>Show Value</button>
			<select onChange={changeLanguage} value="language">
				<option>Language</option>
				<option value="javascript">Javascript</option>
				<option value="python">Python</option>
				<option value="c++">C++</option>
				<option value="c">C</option>
				<option value="java">Java</option>
				<option value="go">Go</option>
			</select>
			<h1>{language}</h1>

			<Editor
				height="90vh"
				theme={theme}
				defaultLanguage="javascript"
				language={language}
				defaultValue="// Start Coding ..."
				value={codeUpdate}
				onMount={handleEditorMount}
				loading="Loading..."
				onChange={codeTransfer}
			/>
		</div>
	);
};

export default TextEditor;

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

const container = document.getElementById('myeditor-container');
const root = ReactDOM.createRoot(container);
root.render(<MyEditor />);

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  return (<Editor editorState={editorState} onChange={setEditorState} />);
}

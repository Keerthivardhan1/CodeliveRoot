import React, { useRef, useEffect } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/darcula.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, teamID, onCodeChange, codeRef }) => {
  const editorRef = useRef(null);
  let flage = useRef(false);
  let codee = useRef();

  useEffect(() => {
    async function init() {
      if (editorRef.current) {
        return;
      }
      const textarea = document.getElementById('realtimeEditor');
      editorRef.current = Codemirror.fromTextArea(textarea, {
        mode: { name: 'javascript', json: true },
        theme: 'darcula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      editorRef.current.on('change', (instance, changes) => {
        // editorRef.current.focus();
        editorRef.current.focus();
        // const cursor = editorRef.current.getCursor();
        // console.log("cursor--" , cursor);
        // editorRef.current.setCursor(cursor);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            teamID,
            code,
          });
        }
      });

      codeRef.on('value', (snapshot) => {
        codee = snapshot.val();
        if (codee) {
          const cursor = editorRef.current.getCursor(); // Get current cursor position
    editorRef.current.setValue(codee);
    editorRef.current.setCursor(cursor); // Set the cursor back to its previous position
    editorRef.current.focus();
        }
      });
      

     
    }
    init();

    return () => {
      codeRef.off();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current != null) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ teamID: receivedTeamID, code }) => {
        if (receivedTeamID === teamID) {
          editorRef.current.setValue(code);
          // editorRef.current.focus();
          // const cursor = editorRef.current.getCursor();
          // console.log("cursor--" , cursor);
          //
        }
      });
    }

    return () => {
      if (socketRef.current != null) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return (
    <div className='editor'>
      <textarea name='text' id='realtimeEditor'></textarea>
    </div>
  );
};

export default Editor;

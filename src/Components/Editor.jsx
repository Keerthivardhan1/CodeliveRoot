import React, { useRef, useEffect } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/darcula.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, teamID , onCodeChange }) => {
  const editorRef = useRef(null);
  let flage = useRef(false);
  useEffect(()=>{
  
    if(socketRef.current != null ){
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ teamID: receivedTeamID, code }) => {
    
        if (receivedTeamID === teamID) {
        editorRef.current.setValue(code);
        }
      }) 
    }
    return ()=>{
      if(socketRef.current != null ){
        socketRef.current.off(ACTIONS.CODE_CHANGE)
      }
    }
  } , [socketRef.current])

      // it is not team specific
      useEffect(
        () => {
          console.log("came 1 ");

          console.log("socketref == " , socketRef , "\n socketref.current == " , socketRef.current );

          if(socketRef != null && socketRef.current!= null ){
            console.log("came 3 ");

        socketRef.current.on('newcode' , ({ socketid,code})=>{
        
          console.log("came 4 ");

          console.log("came to newcode in editor with code" ,  code);
          editorRef.current.setValue(code);
        })

      }

        } , [socketRef.current])

 



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
      flage = true;

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            teamID,
            code,
          });
        }

      });
        

      console.log(" when joined editorRef.current.getValue() is " , editorRef.current.getValue());

      if(editorRef.current.getValue() === "" ){
        console.log("0000");
        editorRef.current.on('change', (instance, changes) => {
          const { origin } = changes;
          const code = instance.getValue();
  
          if (origin !== 'setValue' && (code != " "  && code != "\n") ) {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
              teamID,
              code,
            });
          }
        });
        
      }

      if (socketRef.current) {
        socketRef.current.on('newcode', ({ socketid, code }) => {
          editorRef.current.setValue(code);
        });
      }
    }
    init();
  }, []);

  return (
    <div className='editor'>
      <textarea name='text' id='realtimeEditor'></textarea>
    </div>
  );
};

export default Editor;

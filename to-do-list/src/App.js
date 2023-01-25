import './App.css';
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconCheck from '@mui/icons-material/Check'
import IconClose from '@mui/icons-material/Clear'

function App() {
  const [list, setList] = useState(localStorage.getItem("list") || [])
  const [textInput, setTextInput] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const [valEdit, setValEdit] = useState("")

  const submitEdit = (data, i) => {
    const lists = list
    lists[i].text = data
    setList(lists)
    console.log(lists)
    setShowEdit(false)
  }

  return (
    <div className="App">
      <div className='Container'>
        <h3>
          TodoList
        </h3>
        <div className='add-box'>
          <TextField
            id="text"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyUp={e => {
              if (e.key == "Enter" && textInput.trim()) {
                setList([...list, { text: textInput, check: false }])
                setTextInput("")
              }
            }}
          />
          <div id="btn-add"
            onClick={() => {
              if (!textInput.trim()) return
              setList([...list, { text: textInput, check: false }])
              setTextInput("")
            }}>
            Add
          </div>
        </div>
        <table>
          {list?.map((ele, i) => (
            <tr>
              <td>
                <Checkbox
                  checked={ele.check || ""}
                  onChange={e => {
                    if (!ele.check) {
                      const lists = list
                      lists[i].check = true
                      setList(lists)
                    } else {

                    }
                    console.log(list)
                  }}
                />
              </td>
              <td style={{ width: "100%", textAlign: "left" }}>
                {showEdit === i ?
                  <TextField
                    value={valEdit}
                    onChange={e => setValEdit(e.target.value)}
                    onKeyUp={e => {
                      if (e.key == "Enter" && e.target.value.trim()) {
                        submitEdit(e.target.value, i)
                      }
                    }}
                  />
                  :
                  ele.text
                }
              </td>
              <td>
                {showEdit === i ?
                  <div style={{ whiteSpace: "nowrap" }}>
                    <IconCheck id="btn"
                      onClick={() => submitEdit(valEdit, i)} />
                    <IconClose id="btn"
                      onClick={() => {
                        setShowEdit(false)
                        // setValEdit(ele.text)
                      }} />
                  </div>
                  :
                  <Button
                    style={{ textAligh: "right" }}
                    onClick={() => {
                      setShowEdit(i)
                      setValEdit(ele.text)
                    }}>
                    Edit
                  </Button>
                }
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div >
  );
}

export default App;

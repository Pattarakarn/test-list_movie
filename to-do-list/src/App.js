import './App.css';
import Icon from '@mui/material/Icon'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'

function App() {
  const [list, setList] = useState(localStorage.getItem("list") || [])
  const [textInput, setTextInput] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const [valEdit, setValEdit] = useState("")

  return (
    <div className="App">
      <div className='Container'>
        <h3>
          TodoList
        </h3>
        <TextField
          id="text"
          onChange={e => setTextInput(e.target.value)}
          onKeyUp={e => {
            if (e.key == "Enter") {
              setList([...list, { text: textInput, check: false }])
            }
          }}
        />
        <Button
          onClick={() => {
            setList([...list, { text: textInput, check: false }])
            console.log(list)
          }}>
          Add
        </Button>
        <div>
          {list?.map((ele, i) => (
            <>
              <List style={{ textAlign: "left" }}>
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
                {showEdit === i ?
                  <TextField
                    value={valEdit}
                    onChange={e => setValEdit(e.target.value)}
                    onKeyUp={e => {
                      if (e.key == "Enter") {
                        const lists = list
                        lists[i].text = e.target.value
                        setList(lists)
                        console.log(lists)
                        setShowEdit(false)
                      }
                    }}
                  />
                  :
                  ele.text
                }
                {showEdit === i ?
                  ""
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
              </List>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

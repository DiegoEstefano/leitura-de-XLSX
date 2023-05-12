import { useState, useEffect } from 'react'
import * as XLSX from "xlsx"
import './App.css'

function App() {

  const [dados, setDados] = useState({})
  const [ok, setOk] = useState(false)

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setDados(json)
        setOk(true)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  ok && console.log(dados)
  return (
    <div className='main'>
      <form>
        <label htmlFor="upload">Faça o upload de um arquivo</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
      <div >
        {ok &&
          <table className='teste'>
            <tr className='codigo'>
              <td>
                <tr className='header'>Codigo do produto</tr>
                {dados && dados.map((dado) => (
                  <tr>{dado.COD_PRODUTO}</tr>
                ))}
              </td>
            </tr>

            <tr>
              <td>
                <tr className='header'>Descrição do produto</tr>
                {dados && dados.map((dado) => (
                  <tr>{dado.DESCRICAO1}</tr>
                ))}
              </td>
            </tr>
            
            <tr className='marca'>
              <td>
                <tr className='header'>Marca</tr>
                {dados && dados.map((dado) => (
                  <tr>{dado.DESCRICAO}</tr>
                ))}
              </td>
            </tr>
            <tr className='saldo'>
              <td>
                <tr className='header'>Saldo</tr>
                {dados && dados.map((dado) => (
                  <tr>{dado.SALDO}</tr>
                ))}
              </td>
            </tr>

          </table>
        }



      </div>
    </div>
  )
}

export default App

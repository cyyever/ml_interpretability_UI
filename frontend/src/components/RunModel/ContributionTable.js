import React, { useMemo } from 'react'
import {useTable} from 'react-table'
const VISION_COLUMNS =[
    {
        Header : 'Data',
        accessor : 'data',
        maxWidth : 300,
        maxHeight : 170,
        minWidth : 100,
        Cell : tableProps =>(
            <img 
            src = {"data:image/png;base64,"+tableProps.row.original.data} alt="missing pic"/>
        )
        },
    {
        Header : 'Label',
        accessor : 'label',
        maxWidth : 200,
        maxHeight : 50,
        minWidth : 100,
    },
    {
        Header : 'Contribution',
        accessor : 'value',
        maxWidth : 200,
        maxHeight : 50,
        minWidth : 100,
        
    }
]


const TEXT_COLUMNS =[
    {
        Header : 'Data',
        accessor : 'data',
        maxWidth : 300,
        maxHeight : 170,
        minWidth : 100,
        Cell : tableProps =>(
            <div style={{overflowY:"auto" , maxHeight : "170px"}}>
            <p> {tableProps.row.original.data} </p>
            </div>                                                                             
        ),
        },
    {
        Header : 'Label',
        accessor : 'label',
        maxWidth : 200,
        maxHeight : 50,
        minWidth : 100,
    },
    {
        Header : 'Contribution',
        accessor : 'value',
        maxWidth : 200,
        maxHeight : 50,
        minWidth : 100,
        
    }
]
export const ContributionTable = ({data_ , datasetType}) => {
    let COLUMNS;
    datasetType === "vision" ? COLUMNS = VISION_COLUMNS : COLUMNS = TEXT_COLUMNS
    const columns = useMemo(() => datasetType === COLUMNS , [])

    const data = useMemo(()=> data_ , [data_])

    const tableInstance = useTable({columns,data})

    const{ 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()} className = "striped bordered hover" style={{width:"100%"}}>
            <thead>
                {headerGroups.map((headerGroup) =>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column =>(
                                <th {...column.getHeaderProps()} style= {{maxWidth: column.maxWidth , maxHeight : column.maxHeight, minWidth : column.minWidth}}>{column.render('Header')}</th>
                            ))
                        }
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {
                   rows.map(row =>{
                       prepareRow(row)
                       return (
                        <tr {...row.getRowProps()}>
                        {
                            row.cells.map((cell) =>{
                                return  <td {...cell.getCellProps()} style= {{maxWidth: cell.column.maxWidth , maxHeight : cell.column.maxWidth, minWidth : cell.column.minWidth}} >{cell.render('Cell')}</td>
                            })
                        }
                        </tr>
                       )
                   })
               }
               
            </tbody>
        </table>
    )
}
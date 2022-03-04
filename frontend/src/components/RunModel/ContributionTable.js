import React, { useMemo } from 'react'
import {useTable} from 'react-table'

const COLUMNS =[
    {
        Header : 'Image',
        accessor : 'image',
        Cell : tableProps =>(
            <img 
            src = {"data:image/png;base64,"+tableProps.row.original.image}/>
        )
        },
    {
        Header : 'Label',
        accessor : 'label'
    },
    {
        Header : 'Contribution',
        accessor : 'value',
        
    }
]


export const ContributionTable = ({data_}) => {
    const columns = useMemo(() => COLUMNS , [])
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
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) =>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column =>(
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                                return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
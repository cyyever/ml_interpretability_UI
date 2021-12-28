import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { Card } from 'react-bootstrap';

class ImagePagination extends Component {
    constructor(props){
        super(props);
        this.state={
            data : [],
            offset : 0,
            ImgData : [],
            perPage : 10,
            currentPage : 0
        }     
    }
    recievedImageData(){
        // call Image API Method
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage : selectedPage,
            offset : offset
        } , () => {
            this.recievedImageData()
        })
    }

    render() {
        return (
            <Card bg="light">
                <Card.Body>
                <div className = "row"> 
                    <div className = "col">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
                </Card.Body>
            </Card>
        )
    }
}

export default ImagePagination
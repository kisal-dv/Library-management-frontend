import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { AddBookData, DeleteBooks, GetBooks, UpdateBooks} from '../../service/Book/Book'
import { BookEdit } from './BookEdit';
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import Swal from 'sweetalert2'
import { AddBook } from './AddBook';



export const Book = ()=>{
     const tHeadings:string [] = [
        "BookId",
        "Title",
        "Publisher",
        "ISBN",
        "Author",
        "Edition",
        "Price",
        "Total Qty",
        "Avl Aty",
        "Last Updated Date",
        "Last Updated Time",
        "Options",
     ];

     interface Book {
        bookId: string;
        title: string;
        publisher: string;
        isbn: string;
        author: string;
        edition: string;
        price: number;
        totalQty: number;
        avilableQty: number; 
        // lastUpdatedDate: string; 
        // lastUpdatedTime: string; 
    }
    

     const [books,setBooks] = useState<Book[]>([]);
     const [showEditForm,setShowEditForm] = useState(false);
     const [showAddForm,setShowAddForm] = useState(false);
     const [ selectedRow, setSelectedRow]  =useState<Book | null>(null);

     const handleOnEdit = (row : Book) =>{
       setShowEditForm(true)
       setSelectedRow(row)
     }

     const handleAdd = (newBook:Book) =>{
       setBooks((prev)=> [...prev,newBook])
     }

     const handleOnClose = () => setShowEditForm(false);

     const handleOnDelete = async (bookId :string) =>{
       try{
         //add confirmation
        await DeleteBooks(bookId);
    
        setBooks(books.filter((book)=> book.bookId !== bookId))
       }catch(err){
         console.error(err);
         
       }
       
    }

    const handleUpdateState = (updatedbook : Book)=>{
       const updatedBooks  = books.map((book)=> 
           book.bookId === updatedbook.bookId ? updatedbook : book
       );
       setBooks(updatedBooks)
    }


     useEffect(()=>{
         //load book data
         const loadData = async ()=>{
            const getAllBooks = await GetBooks()
            setBooks(getAllBooks)
            console.log("Get All Books",getAllBooks)
         };
         loadData();
     },[])

     return(
         <>
         <div className="d-flex justify-content-end p-3">
         <Button variant="outline-primary" onClick={()=> setShowAddForm(true)}>Add Book</Button>
         </div>
         <Table striped bordered hover>
      <thead>
         <tr>
            {tHeadings.map((headings)=> (
                <th>{headings}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {books.map((row) =>(
           <tr key={row.bookId}>
              {Object.values(row).map((cell,index)=>(
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className='d-flex gap-2'>
                <Button variant="outline-success" onClick={() =>handleOnEdit(row)}>Edit</Button>
                <Button variant="outline-danger" onClick={() => handleOnDelete(row.bookId)}>Delete</Button>
                </div>
              </td>
           </tr>
        ))}
      </tbody>
    </Table>
    {/* Book Edit */}
    <BookEdit
      show={showEditForm}
      selectedRow = {selectedRow}
      handleOnClose = {handleOnClose}
      updateBooks = {UpdateBooks}
      handleUpdateState = {handleUpdateState}
  
    />
      <AddBook
       show={showAddForm}
       handleClose={()=> setShowAddForm(false)}
       handleAdd={handleAdd}
       addBook={AddBookData}
      />
         </>
     )
}
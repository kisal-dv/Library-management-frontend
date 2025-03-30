import { useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";

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
}

export const AddBook = ({show,handleClose,handleAdd,addBook} :any) => {
const [newBook,setnewBook] = useState<Book>({
  bookId: "",
  title: "",
  publisher: "",
  isbn: "",
  author: "",
  edition: "",
  price: 0,
  totalQty: 0,
  avilableQty: 0
});
const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value} = e.target
   setnewBook((prev)=> ({...prev,[name]:value}))
}
const handleSubmit = async () =>{
  try{
     // save the form data at the back end
    const bookDetails =  await addBook(newBook)
    console.log("Saved Book Details",bookDetails)
    handleAdd(bookDetails);
    handleClose();



  }catch(err){
    console.error(err)
    throw err
  }
}

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
  
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                type="textl"
                placeholder="name@example.com"
                name="title"
                value={newBook.title}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Publisher">
              <Form.Control
                type="text"
                placeholder="Password"
                name="publisher"
                value={newBook.publisher}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="ISBN">
              <Form.Control
                type="text"
                placeholder="Password"
                name="isbn"
                value={newBook.isbn}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Author">
              <Form.Control
                type="text"
                placeholder="Password"
                name="author"
                value={newBook.author}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Edition">
              <Form.Control
                type="text"
                placeholder="Password"
                name="edition"
                value={newBook.edition}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Price">
              <Form.Control
                type="number"
                placeholder="Password"
                name="price"
                value={newBook.price}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Total Qty">
              <Form.Control
                type="nuber"
                placeholder="Password"
                name="totalQty"
                value={newBook.totalQty}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Avl Qty">
              <Form.Control
                type="number"
                placeholder="Password"
                name="avilableQty"
                value={newBook.avilableQty}
                onChange={handleOnChange}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

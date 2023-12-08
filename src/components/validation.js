//name = the sring more then 1 chars

//author = the sring more then 1 chars, no the numbers
//category = choose from list
//isbn =
export default function isValidISBN(values) {
  let regex = new RegExp(
    /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/
  );
  let errors = {};

  if (!values.isbn) {
    errors.isbn = "ISBN is required";
  } else if (!regex.test(values.isbn));


  if(!values.name){
    errors.name = "Name is required"
  };

  if(!values.author){
    errors.author = "Name author is required"
  }else if (values.author.lenght < 1){
    errors.author = "Name author to be more than 1 characters";
  };

  if(!values.category){
    errors.category = "Category is required"
  };

  return errors;
}

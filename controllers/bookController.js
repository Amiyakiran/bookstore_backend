const books = require("../model/bookModel")
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51R7KVH4ThNmb9j6tlu8MrE8QMk4aYfHCZEs9TVLOUQrzwLyzd3pzgtj6yU9nRwVdw0aL0OUEvyKIKAX5hJUXstWV00QmlQ0MO8'); 




exports.getHomeBookController = async(req, res)=>{
    console.log('getHomeBookController');
    
    try {
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllUserBookController = async(req, res)=>{
    console.log('getAllUserBookController');
    
     const userMail = req.payload
    //  console.log(userMail);
     

    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        title:{
            $regex:searchKey, $options:"i"
        },
        userMail:{ $ne:userMail}

     } 
    
    try {
      
        const allBooks = await books.find(query)
        res.status(200).json(allBooks)
       
       
        
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getABookController = async(req, res)=>{
    const {id} = req.params 
    console.log(id);
    try {
        const existingbook = await books.findOne({_id:id}) 
        res.status(200).json(existingbook)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.uploadBookController = async(req, res)=>{
    console.log('uploadBookController');
    console.log(req.headers);
    
    const {title, author, publisher, language,noOfPage,isbn,imageurl,price,discountPrice,abstract, category} = req.body
    console.log(title, author, publisher, language,noOfPage,isbn,imageurl,price,discountPrice,abstract, category);
    console.log(req.files);
   let uploadImageName = []
    req.files.map((item)=>uploadImageName.push(item.filename))
    console.log(uploadImageName);
    const userMail = req.payload
    console.log(userMail);

    try {
        const existingBook = await books.findOne({title, userMail})

        if(existingBook){
            res.status(406).json('You have already added this Book for sail')
        }
        else{
            const newBook = await books({
                title, author, publisher, language,noOfPage,isbn,imageurl,price,discountPrice,category
                ,abstract,uploadImages:uploadImageName, userMail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }

        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.sellBookController = async(req, res)=>{
    const userMail = req.payload
    console.log(userMail);
    try {
        const userBook = await books.find({userMail})
        res.status(200).json(userBook)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.broughtBookController = async(req, res)=>{
    const userMail = req.payload
    console.log(userMail);
    try {
        const userBroughtBook = await books.find({brought:userMail})
        res.status(200).json(userBroughtBook)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}


exports.getAllBookController = async(req, res)=>{
    console.log('getAllBookController');
 
    try {
      
        const allBooks = await books.find()
        res.status(200).json(allBooks)
       
       
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.approveBookController = async(req, res)=>{
    const {_id , title, author, publisher, language,noOfPage,isbn,imageurl,price,discountPrice,abstract, category, status,uploadImages, userMail,brought} = req.body
    console.log(_id , title, author, publisher, language,noOfPage,isbn,imageurl,price,discountPrice,abstract, category, status,uploadImages, userMail,brought);

    try {
        const existingBook = await books.findByIdAndUpdate({_id},{
            _id , title, author, publisher, language,noOfPage,isbn,imageurl,price,discountPrice,abstract, category, status:"approved",uploadImages, userMail,brought
        },{new:true})

        await existingBook.save()
        res.status(200).json(existingBook)
        
    } catch (error) {
       res.status(401).json(error) 
    }
    
}
exports.deleteSoldBookController = async(req, res)=>{
    const {id} = req.params 
    console.log(id);
    try {
        const existingBook = await books.findByIdAndDelete({_id:id})
        res.status(200).json('Delete successfull')
        
    } catch (error) {
        res.status(200).json(error)
    }
    
}

// exports.makePaymentController = async(req, res)=>{
//     const {bookDetails} = req.body
//     console.log(bookDetails);
//     const buyer = req.payload
//     console.log(buyer);
    

//     try {
//         const lineItem = [{
//             price_data: {
//                 currency: "usd",
//                 product_data: { 
//                     name: bookDetails.title,
//                     description: `${bookDetails.author} | ${bookDetails.publisher}`, // You could include more details in the description
//                     images: [bookDetails.imageurl], // Array for images
//                     metadata: {
//                         book_name: bookDetails.title,
//                         book_author: bookDetails.author,
//                         book_publisher: bookDetails.publisher,
//                         book_language: bookDetails.language,
//                         book_noOfPage: bookDetails.noOfPage,
//                         book_isbn: bookDetails.isbn,
//                         book_real_price: bookDetails.price,
//                         book_discount_price: bookDetails.discountPrice,
//                         book_abstract: bookDetails.abstract,
//                         book_seller: bookDetails.userMail,
//                         book_category: bookDetails.category,
//                         book_buyer: buyer
//                     }
//                 },
//                 unit_amount: Math.round(bookDetails.discountPrice * 100) // Cent value
//             },
//             quantity: 1
//         }];
        
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"], 
//             line_items: lineItem,           
//             mode: "payment",
//             success_url: "http://localhost:5173/payment-success", // Replace with your success URL
//             cancel_url: "http://localhost:5173/payment-error"    // Replace with your cancel URL
//         });
//         res.status(200).json({ sessionId: session.id });

//         const existingbook = await books.findOne({_id:bookDetails._id})

//         if(existingbook){
//             const updateBook = new books.findByIdAndUpdate({_id:bookDetails._id},{
//                 title: bookDetails.title, author:bookDetails.author, publisher:bookDetails.publisher, language:bookDetails.language,noOfPage:bookDetails.noOfPage,isbn:bookDetails.isbn,imageurl:bookDetails.imageurl,price:bookDetails.price,discountPrice:bookDetails.discountPrice,category:bookDetails.category
//                 ,abstract:bookDetails.abstract,uploadImages:bookDetails.uploadImages, userMail:bookDetails.userMail,
//                 status:'sold', brought:buyer
//             },{new:true})
//             console.log(updateBook);
            
//            await updateBook.save()
//         }

        
//     } catch (error) {
//         res.status(401).json(error)
//     }
    
    
// }


exports.makePaymentController = async (req, res) => {
    const { bookDetails } = req.body;
    console.log(bookDetails);
    const buyer = req.payload;
    console.log(buyer);

    try {
        // First, update the book record if it exists
        const existingBook = await books.findOne({ _id: bookDetails._id });

        if (existingBook) {
            // Update the book status to 'sold' and set buyer info
            const updatedBook = await books.findByIdAndUpdate(
                { _id: bookDetails._id },
                {
                    title: bookDetails.title,
                    author: bookDetails.author,
                    publisher: bookDetails.publisher,
                    language: bookDetails.language,
                    noOfPage: bookDetails.noOfPage,
                    isbn: bookDetails.isbn,
                    imageurl: bookDetails.imageurl,
                    price: bookDetails.price,
                    discountPrice: bookDetails.discountPrice,
                    category: bookDetails.category,
                    abstract: bookDetails.abstract,
                    uploadImages: bookDetails.uploadImages,
                    userMail: bookDetails.userMail,
                    status: 'sold',  // Mark the book as sold
                    brought: buyer   // Add buyer info
                },
                { new: true }
            );
            console.log(updatedBook);
        }

        // Now, create the Stripe session
        const lineItem = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: bookDetails.title,
                    description: `${bookDetails.author} | ${bookDetails.publisher}`,
                    images: [bookDetails.imageurl], // Array for images
                    metadata: {
                        book_name: bookDetails.title,
                        book_author: bookDetails.author,
                        book_publisher: bookDetails.publisher,
                        book_language: bookDetails.language,
                        book_noOfPage: bookDetails.noOfPage,
                        book_isbn: bookDetails.isbn,
                        book_real_price: bookDetails.price,
                        book_discount_price: bookDetails.discountPrice,
                        book_abstract: bookDetails.abstract,
                        book_seller: bookDetails.userMail,
                        book_category: bookDetails.category,
                        book_buyer: buyer
                    }
                },
                unit_amount: Math.round(bookDetails.discountPrice * 100) // Cent value
            },
            quantity: 1
        }];

        // Create the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItem,
            mode: "payment",
            // success_url: "https://bookstore-backend-263y.onrender.com/payment-success",  // Replace with your actual success URL
            success_url: "http://localhost:5173/payment-success",
            // cancel_url: "https://bookstore-backend-263y.onrender.com/payment-error"     // Replace with your actual cancel URL
            cancel_url: " http://localhost:5173/payment-error"

            // http://localhost:5173/
        });

        // Respond with session ID
        res.status(200).json({ sessionId: session.id });
        
    } catch (error) {
        //console.error(error);
        res.status(401).json(error);
    }
};
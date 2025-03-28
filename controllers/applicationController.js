const applications = require("../model/appModel");

exports.jobApplicationController = async(req, res)=>{
    console.log('inside jobApplicationController');
    const {fullname, qualification , email, phone,coverLetter, jobTitle} = req.body
    console.log(fullname, qualification , email, phone,coverLetter, jobTitle);
    

    console.log(req.file);
    const resume = req.file.filename
    console.log(resume);
    
    

   try {
    const appliedJob = await applications.findOne({jobTitle , email})
    console.log(appliedJob);
    
    if(appliedJob){
        res.status(406).json('Already applied')

    }
    else{
        const newApplicant = new applications({
            fullname, qualification , email, phone,coverLetter, jobTitle, resume
        })
        await newApplicant.save()
        res.status(200).json(newApplicant)
    }
    
   } catch (error) {
    res.status(401).json(error)
   }
    
}

exports.getAllApplicationController = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        jobTitle:{
            $regex:searchKey, $options:"i"
        }

     }
    try {
        const allApplication = await applications.find(query)
        res.status(200).json(allApplication)
        
    } catch (error) {
        res.status(401).json(error)
    }
}
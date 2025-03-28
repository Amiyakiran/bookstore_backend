const jobs = require("../model/jobModel");


exports.addJobController = async(req, res)=>{
    const {jobId ,title,location,type,salary,qualification,experience,description} = req.body
    console.log(jobId ,title,location,type,salary,qualification,experience,description);
    try {
        const existingJob = await jobs.findOne({title, location})
        if(existingJob){
            res.status(406).json('Job Role already added')
        }
        else{
            const newJob = new jobs({
                jobId,
                title,
                location,
                type,
                salary,
                qualification,
                experience,
                description
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
    

}


exports.getJobController = async(req, res)=>{
    const searchKey = req.query.search
    const query = {
        title:{
            $regex:searchKey, $options:"i"
        }

     }

    try {
        const allJobs = await jobs.find(query)
        res.status(200).json(allJobs)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteJobController = async(req,res)=>{
    const {id} = req.params 
    console.log(id);
    try {
        const delJob = await jobs.findByIdAndDelete({_id:id})
        res.status(200).json('Deleted successfully')
        
    } catch (error) {
        res.status(401).json(error)   
    }
    
}
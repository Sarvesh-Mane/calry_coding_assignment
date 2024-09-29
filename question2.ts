import express, { Request, Response } from 'express'; 
import fs from 'fs'; 
import path from 'path'; 
import bodyParser from 'body-parser'; 

const app = express(); 
app.use(bodyParser.json());
const PATH = path.join(__dirname, 'requests.json');

'I have tried to console to the log whenever possible to see if the flow is correct and which helped me a lot in debugging.'
'I will comment them out to not obstruct the final result and create mess.'

app.post('/requests', (req: Request, res: Response) => {
    const data = readData(); 
    const newReq = req.body; 
    console.log("New request received:", newReq); // consoling to check if POST works or not

    newReq.id = Date.now().toString(); ' request id is assigned as the date of issuing the Req'
    //console.log("Assigned new ID:", newReq.id);
    data.push(newReq);
    writeData(data); 
   // console.log("Success!:", newReq);
    res.status(201).json(newReq); 
});

app.get('/requests', (req: Request, res: Response) => {
    const data = readData();                       'Read curr data'
  //  console.log("Get all requests");
  //  console.log("Requests:", data);

    'Felt better to sort by arranging on the basis of priority, 1- high, 2- moderate, 3 -low '  

    data.sort((a: any, b: any) => a.priority - b.priority);  
    console.log("Sorted requests by priority:", data);
    res.json(data);  // will see all requests made till now
});

app.get('/requests/:id', (req: Request, res: Response) => {
    const data = readData(); // Read current data
  //  console.log("Looking for request with ID:", req.params.id);
 
  'r.id === req.params.id compares id of curr req (r.id) with id in URL (req.params.id).'
  'If id of current req matches id of URL .find() method will return req'
    const request = data.find((r: any) => r.id === req.params.id);

    if (request) {
       // console.log(" found:", request);
        res.json(request);
    } else {
       // console.log(" not found");
        res.status(404).send('Request not found');
    }
});


app.put('/requests/:id', (req: Request, res: Response) => {
    const data = readData();                                         ' Read curr data'
    //console.log("Updating request", req.params.id);

    const index = data.findIndex((r: any) => r.id === req.params.id);

    if (index !== -1) {
        //console.log("Request found, updating with new details:", req.body);
        data[index] = { ...data[index], ...req.body };

        // Write the updated data to the file
        writeData(data);
        //console.log(" updated ", data[index]);

        res.json(data[index]);
    } else {
       // console.log(" cannot update");
        res.status(404).send('Request not found');
    }
});


app.delete('/requests/:id', (req: Request, res: Response) => {
    const data = readData(); 
   // console.log("Delete request:", req.params.id);
    const newData = data.filter((r: any) => r.id !== req.params.id);
    //console.log(newData);
    writeData(newData);
 //   console.log("Req deleted ");
    res.status(204).send(); 
});


app.post('/requests/:id/complete', (req: Request, res: Response) => {
    const data = readData(); 
  //  console.log("completed:", req.params.id);
    const index = data.findIndex((r: any) => r.id === req.params.id);

    if (index !== -1) {
      //  console.log("marking as completed...");
        data[index].status = 'completed';
        writeData(data);
      //  console.log("marked as completed:", data[index]);
        res.json(data[index]);
    } else {
       // console.log("Request not found");
        res.status(404).send('Request not found');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


//Helper Funcs used to read and Write

function readData() {
   // console.log("Reading data");
    if (fs.existsSync(PATH)) {
        const data = fs.readFileSync(PATH, 'utf-8'); 
       // console.log("File read successfully:", data);
        return JSON.parse(data); 
    } else {
        //console.log("No data file found, returning an empty array.");
        return [];
    }
}


function writeData(data: any) {
   // console.log("Writing data");
    fs.writeFileSync(PATH, JSON.stringify(data, null, 2)); 
    //console.log("written success!");
}

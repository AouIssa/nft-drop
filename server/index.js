const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json())


app.get("/getNFTDetails", (req, res) => {
    db.query("select * from NFTDetails WHERE redeemed = 0", (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})

app.get("/updateDetailsFromCid/:cid", (req, res) => {
    const cid = req.params.cid;
    db.query("UPDATE NFTDetails SET redeemed = '1' WHERE cid = ?", [cid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
})


app.get("/getDetailsFromCid/:cid", (req, res) => {

    const cid = req.params.cid;
    db.query("SELECT tokenId,uri,minPrice,signature FROM NFTDetails WHERE cid = ?", [cid],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/getNumberOfRow", (req, res) => {
    db.query("SELECT MAX(id) FROM  NFTDetails", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
})


app.post("/api/create", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const minPrice = JSON.stringify(req.body.minPrice);
    const uri = req.body.uri;
    const tokenId = req.body.tokenId;
    const signature = req.body.signature;
    const cid = req.body.cid;

    console.log("eqfeq", minPrice)

    db.query("INSERT INTO NFTDetails (name,tokenId,description,uri,minPrice,signature,redeemed,cid) VALUES (?,?,?,?,?,?,?,?)", [name, tokenId, description, uri, minPrice, signature, false, cid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
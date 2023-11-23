const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const opn = require('opn');
const app = express();

const port = 3000;


// Use express.static middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./pages/index.html"));
});

app.post('/api/create_post', (req, res) => {
    const { title, author, content, email } = req.body;

    const date = new Date();

    const date2 = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    const postHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <link rel='stylesheet' type='text/css' href='/src/style.css'>

                <header>
                    <h1>World2Prog</h1>
                    <button id="home">Home</button>
                    <button id="createPostButton">Create Post!</button>
                    <button id="apiDocs">API</button>
                </header>
            </head>
            <body>
                <div style='line-height: 0.9;'>
                    <h1>${title}</h1>
                    <h2>Author: ${author}</h2>
                    <p>Date: ${date2}</p>
                </div>

                <div>
                    <h3>${content}</h3>
                </div>
                <div>
                    <p>Author Email: ${email}</p>
                </div>
            </body>
            <script src="/public/src/TabScript.js"></script>
        </html>
    `;

    const postid = Date.now(); // Use a unique identifier for postid (e.g., timestamp)
    const postFilePath = path.join(__dirname, `./posts/${postid}.html`);

    fs.writeFile(postFilePath, postHTML, (err) => {
        if (err) {
            console.error('Error creating post file:', err);
            res.status(500).send('Error creating post file');
        } else {
            console.log(`Post file created at: ${postFilePath}`);
            res.json({ postid });
        }
    });

})

app.post('/api/delete_post', (req, res) => {

    const { postid, key } = req.body;


    if (!postid || !key) {
        return res.status(400).send('Missing postid or key in the request body');
    }

    const deletedPageHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>World2Prog - Deleted Post</title>
                <link rel="stylesheet" href="/public/src/DeletedPageStyle.css">
            </head>
            <body>
                <header>
                    <h1>World2Prog</h1>
                </header>
                <div>
                    <h1>Sorry, This Page Has Been Deleted</h1>
                    <button id="home">Home</button>
                </div>
                <script src="/public/src/DeletedPageScript.js"></script>
            </body>
        </html>
    `;

    if (key === "Admin") {
        const filePath = path.join(__dirname, `./posts/${postid}.html`);

        fs.writeFile(filePath, deletedPageHTML, (err) => {
            if (err) {
                console.error('Error deleting post file:', err);
                return res.status(500).send('Error deleting post file');
            }

            console.log(`Post file deleted at: ${filePath}`);
            return res.json({ postid });
        });
    } else {
        console.log(`Given Key: ${key}`);
        return res.status(401).send('Unauthorized');
    }
});


app.get('/post/:postid', (req, res) => {
    const postid = req.params.postid;
    res.sendFile(path.join(__dirname, `./posts/${postid}.html`));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/post_upload.html'));
})

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, "./pages/index.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

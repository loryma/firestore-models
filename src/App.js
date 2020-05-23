import React from 'react';
import './App.css';
import db from './config';

const tagsRef = db.collection('posts').doc('WQdc0nZI5CC5Rt723THR').collection('tags');
const postsRef = db.collection('posts');

//Shared document Id
const authorId = 'heinlain';
const author = db.collection('authors').doc('heinlain');
const books = db.collection('books').doc('heinlain');

const bookAuthorId = 'leguin';
const bookId = 'left_hand_of_darkness';

//7.Middle Man Collection
const userReviews = db.collection('reviews').where('author', '==', bookAuthorId);
const bookReviews = db.collection('reviews').where('book', '==', bookId);

//Single read with composite key
const specificReview = db.collection('reviews').doc(`${bookId}_${authorId}`);

//8.Map
// Reviews embedded on books

const booksWithReviews = db.collection('books').doc(bookId);
const userReviews = db.collection('books').orderBy('reviews.leguin');

//9. Array
const books = db.collection('books').where('categories', 'array-contains', 'fiction');

//comment tree
const topLevel = db.collection('comments').where('parent', '==', false);
const traverseBredth = level => db.collection('comments').where('level', '==', level);
const traverseDepth = id => {
    return db.collection('comments').where('parent', '>=', id).where('parent', '<=', `${id}~`);
};
//Join related documents with different ids
const getAccount = async userId => {
    const snapshot = await db.collection('authors').doc(userId).get();
    const user = snapshot.data();

    return db.collection('accounts').doc(user.accounts).get();
};

const readIds = async (collection, ids) => {
    const reads = ids.map(id => collection.doc(id).get());
    const result = await Promise.all(reads);
    return result.map(v => v.data());
};

readIds(db.collection('products'), ['foo', 'bar', 'baz']);

function App() {
    const [data, setData] = React.useState([]);
    const [account, setAccount] = React.useState('');
    React.useEffect(() => {
        const posts = [];
        postsRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setData(posts);
        });

        getAccount(authorId).then(account => setAccount({ ...account.data() }));
    }, []);

    console.log(data);
    return (
        <div className='App'>
            {data &&
                data.map(post => (
                    <div>
                        <h3>{post.title}</h3>
                    </div>
                ))}
            <h2>Authors & accounts:</h2>
            Heinlain's profit: {account && account.profit}
        </div>
    );
}

export default App;

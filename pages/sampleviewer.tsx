import pb from './api/pocketbase';

const BlogPost = ({ blogpost }:any) => {


  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-white">{blogpost.title}</h1>
      
      <div className="mb-6">
        {blogpost.content.map((item: any, index: any) => (
          <div key={index} className="mb-4">
            {item.type === 'text' && <p>{item.text}</p>}
            {item.type === 'image' && (
              <img src={item.image} alt={`Image ${index + 1}`} className="max-w-full h-auto" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        {/* {blogpost.content.map((item, index) => (
          <div key={index} className="mb-4">
            {item.type === 'text' && <p>{item.text}</p>}
            {item.type === 'image' && (
              <img src={item.image} alt={`Image ${index + 1}`} className="max-w-full h-auto" />
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default BlogPost;


export async function getServerSideProps(context: any) {
  const articleId = await context.query.id?.toString();
  const blogpost = await pb
    .collection("sampleblogposts")
    .getOne("0pagq01crmqyms2", {
      expand: "relField1,relField2.subRelField",
      $autoCancel: false,
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res.formData);
      const data = await JSON.parse(myResponse);
      console.log("Hello", myResponse);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  /* const myAuthor = await pb
     .collection("users")
     .getOne(article.author, {
       expand: "relField1,relField2.subRelField",
     })
     .then(async (res) => {
       const myres = JSON.stringify(res);
       const mydata = await JSON.parse(myres);
       // console.log(myres);
       return myres;
     });*/
  // article.assign(myAuthor, myAuthor);
  // article["myAuthor"] = myAuthor;
  return { props: { blogpost } };
}
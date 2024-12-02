import React, {useState, useEffect} from "react";
import { FC } from "react";
import axios from "axios";

function Home() {

    const [categories, setCategories] = useState<any[]>([]);
  
    
    useEffect(() => {
      axios.get('data.json')
      .then((res) => {
        setCategories(res.data["categories"])
      })
    }, []);


    return (
        <div>
            <div>Home</div>  
            {categories.map(category => <div>{category.name}</div>)}
        </div>
    );
};

export default Home;
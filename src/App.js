import './App.css';
import {useState} from "react";
import config from './data.json'
function App() {
    const [data,setData]=useState(config);
    const [isExpanded,setIsExpanded]=useState({});
    const addNodeToList=(parentId)=>{
        const folderName=prompt("Enter folder name");
        const updateTree=(list)=>{
            return list.map((item)=>{
                if(item.id===parentId){
                    return {
                        ...item,
                        children: [
                            ...item.children,
                            {id:Date.now().toString() , name:folderName, isFolder: true, children: []}
                        ]
                    }
                }
                if(item.children){
                    return {...item,children:updateTree(item.children)}
                }

                return item;
            })
        }
        setData((prev)=>updateTree(prev));
    }

    const deleteNodeFromList=(parentId)=>{
        const updateTree=(list)=>{
            return list.filter(item=>item.id!==parentId).map((node)=>{
                if(node.children){
                    return {...node,children:updateTree(node.children)}
                }
                return node;
            })
        }
        setData((prev)=>updateTree(prev));
    }

    const List =({data,addNodeToList,deleteNodeFromList})=>{
        return(

            <div className={"container"}>
                {
                    data?.map((node)=>(
                        <div key={node.name} className="item">
                            {node.isFolder&&<span className={"span-icon"}
                            onClick={()=>
                                setIsExpanded((prev)=>({...prev,[node.name]:!prev[node.name]}))
                            }>
                               {isExpanded?.[node.name]?"-" : "+"}
                            </span>}
                            <span>{node.name}</span>
                            {node.isFolder&&<span onClick={()=>addNodeToList(node.id)}><img
                                src={"./img.png"}
                                alt={"add-folder-icon"}
                                className={"icon"}
                            /></span>}
                            {node.isFolder&&<span onClick={()=>deleteNodeFromList(node.id)}><img
                                src={"./img_1.png"}
                                alt={"delete-folder-icon"}
                                className={"icon"}
                            /></span>}
                            {isExpanded?.[node.name]&&node?.children&&<List data={node.children} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}/>}
                        </div>
                    ))
                }
            </div>
        )
    }


  return (
    <div className="App">
            <h1>VS code File Structure</h1>
            <List data={data} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}/>

    </div>
  );
}

export default App;

import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useRef, useState } from "react";
import Connectors from "../Components/Connectors/connectors";
import Node from "../Components/Nodes/nodes";
import styles from "../styles/Home.module.scss";

const GenerateIndexKey = () => {
  return Math.floor(Math.random() * 10000000).toString();
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MakeNodeGlow = (id: string, color: string) => {
  const node = document.getElementById(id);
  if (node) {
    node.style.backgroundColor = color;
    node.style.color = '#fefefe';
  }
}

const BinarySearchTree = async(nodeList: Array<number>, target: number) => {
  const dummy = [null, ...nodeList];
  let index = 1;
  const glowNodes = [];
  while (index * 2 < nodeList.length) {
    if (dummy[index] === target) {
      glowNodes.push(`node-${dummy[index]}`);
      break
    };
    if (target < dummy[index]!) {
      glowNodes.push(`node-${dummy[index]}`);
      index = index * 2;
    }

    else if (target  > dummy[index]!) {
      glowNodes.push(`node-${dummy[index]}`);
      index = index * 2 + 1;
    }
  };

  let glowIndex: any = 0;
  for (glowIndex in glowNodes) {
    let color = '#ff385c';
    if (parseInt(glowIndex) === glowNodes.length -1) {
      color = 'rgb(45, 255, 45)';
    }
    MakeNodeGlow(glowNodes[glowIndex], color);
    await sleep(1000);
  }
};

const Home: NextPage = () => {
  const [arrInput, setArrInput] = useState<Array<number | null | any> | null>(
    null
  );
  const [finalArr, setFinalArr] = useState<Array<Array<number | null>> | null>(
    null
  );

  const CreateSeperatedarray = () => {
    if (arrInput) {
      const dummy = [...arrInput];
      const new_array: Array<Array<number | null>> = [];
      for (let i = 1; i < dummy.length; i *= 2) {
        let startPoint = 2 ** new_array.length - 1;
        if (new_array.length === 0) {
          startPoint = 0;
        }
        const NodesContainer = dummy.slice(startPoint, startPoint + i);
        new_array.push(NodesContainer);
      }
      setFinalArr(new_array);
    }
  };

  const ChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const dummyArr: Array<number> = [];
    value.split(",").forEach((nodes) => {
      dummyArr.push(parseInt(nodes));
    });
    setArrInput(dummyArr);
  };

  const InitiateBinarySearch = async() => {
    if (arrInput) {
      const dummy = [...arrInput];
      BinarySearchTree(dummy, 8);
    }
  };

  const NodePlacements = useMemo(() => {
    if (finalArr) {
      const dummyArr = [...finalArr];
      const NodeDataContainer = dummyArr.map((element) => {
        const index = GenerateIndexKey();
        return (
          <div key={index} className={styles.NodeContainer}>
            {element.map((data) => {
              const innerIndex = GenerateIndexKey();
              return (
                <Node id={`node-${data}`} key={innerIndex} data={data}>
                  {/* <Connectors rotation={"60deg"} />
                  <Connectors rotation={"-60deg"} /> */}
                </Node>
              );
            })}
          </div>
        );
      });
      return NodeDataContainer;
    }
    return null;
  }, [finalArr]);

  return (
    <>
      <Head>
        <title>App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input type="text" onChange={ChangeInputValue} placeholder="InputArray" />
      <button type="submit" onClick={CreateSeperatedarray}>
        Submit
      </button>
      <div id={styles.Maincontainer}>
        {NodePlacements}
        <button
          onClick={InitiateBinarySearch}
          style={{
            backgroundColor: "#ff385c",
            padding: "18px 3%",
            border: "none",
            marginTop: "70px",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Start Binary Search
        </button>
      </div>
    </>
  );
};

export default Home;
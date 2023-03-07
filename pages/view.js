import { Card, Button, Upload, Input, InputNumber, Space } from "antd";
import LazyMinter from "./helper/LazyMinter";
import StackGrid from "react-stack-grid";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const DEFAULT_CONTRACT_NAME = "LazyNFT";

// rewrite ipfs:// uris to dweb.link gateway URLs
function makeGatewayURL(ipfsURI) {
  return ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
}

async function redeem(cid) {
  fetch(`http://localhost:4000/getDetailsFromCid/${cid}`)
    .then((response) => {
      return response.json();
    })
    .then(async (output) => {
      var lazyMinter = new LazyMinter();
      var response = await lazyMinter.redeem(output[0]);
      updateRedeem(cid);
    });
  return;
}

async function updateRedeem(cid) {
  fetch(`http://localhost:4000/updateDetailsFromCid/${cid}`)
    .then((response) => {
      return response.json();
    })
    .then((fef) => {
      window.location.reload(false);
    });
  return;
}

async function fetchIpfsJsonFromCid(cid) {
  const url = "https://" + cid + ".ipfs.nftstorage.link/metadata.json";
  const resp = await fetch(url);
  return resp.json();
}

async function convertToDecimal(hex) {
  const value = parseInt(hex.hex, 16);

  return value / 100;
}

export default function NFTViewer({ signer, provider, name, customContract }) {
  const [galleryList, setGalleryList] = useState([]);
  const metadata = [];
  const [data, setData] = useState();

  useEffect(() => {
    const getNFTDetails = () => {
      fetch("http://localhost:4000/getNFTDetails")
        .then((response) => {
          console.log("response", response);
          return response.json();
        })
        .then((posts) => {
          setData(posts);
        })
        .then((err) => {
          console.log(err);
        });
    };
    getNFTDetails();
  }, []);

  useEffect(() => {
    handleData();
  }, [data]);

  const handleData = async () => {
    const list = [];

    for (const a in data) {
      const cardActions = [];
      cardActions.push(
        <div>
          <Button
            onClick={() => {
              redeem(data[a].cid);
            }}
          >
            Redeem
          </Button>
        </div>
      );
      metadata[a] = await fetchIpfsJsonFromCid(data[a].cid);

      data[a].image = makeGatewayURL(metadata[a].image);

      console.log(data[a].image);

      data[a].minPrice = await convertToDecimal(data[a].minPrice);

      list.push(
        <Card
          style={{ width: 200 }}
          // key={data[a].name}
          actions={cardActions}
          // title={
          //   <div>
          //     {data[a].name}
          //     <a target='_blank' rel='noreferrer'>
          //     <LinkOutlined />
          //     </a>
          //   </div>
          // }
        >
          <img src={data[a].image} alt="" style={{ height: 150, width: 150 }} />

          <div style={{ fontSize: 15, textAlign: "left", opacity: 0.77 }}>
            {data[a].description}
          </div>
          <div style={{ fontSize: 12, textAlign: "left", opacity: 0.55 }}>
            {data[a].minPrice + " MATIC"}
          </div>
        </Card>
      );
    }
    setGalleryList(list);
  };

  return (
    <>
      <Navbar />
      <StackGrid columnWidth={150} gutterWidth={16} gutterHeight={16}>
        {galleryList}
      </StackGrid>
    </>
  );
}

import type { GetServerSideProps, NextPage } from "next";
import { sanityClient, urlFor } from "../sanity";
import Head from "next/head";
import Image from "next/image";
import { Collection } from "../typings";
import Navbar from "../components/Navbar";

interface Props {
  collections: Collection[];
}
const Home = ({ collections }: Props) => {
  return (
    <div>
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     {/*Nav Bar*/}

     <Navbar/>



      <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
        The <span className="font-extrabold underline ">Aous</span> NFT Coding
        practice place
      </h1>

      <main>
        <div>
          {collections.map((collection) => (
            <div
              className="flex flex-col items-center transition-all duration-200 hover:scale-205"
            >
              <img
                className="h-96 w-60 rounded-2xl cursor-pointer object-cover "
                src={urlFor(collection.mainImage).url()}
                alt=""
              />
              <div>
                <h2 className="text-3xl">{collection.title}</h2>
                <p className="mt-2 text-sm text-gray-400">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"] {
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
      },
    },
  }`;

  const collections = await sanityClient.fetch(query);

  return {
    props: {
      collections,
    },
  };
};

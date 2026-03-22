
import React, { use} from "react";
import Link from "next/link";
import { getCollections } from "../../actions/getCollections";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Collection } from "../../../../types";
import Image from "next/image";
import CollectionCard from "./collection-card";

gsap.registerPlugin(SplitText);

const Collections = async () => {
   const collections: Collection[] = await getCollections();



  return (
    <section className=" bg-[#f8f8f8] h-min w-full">
      <div className=" min-h-full">
        <CollectionCard collections={collections}/>
      </div>
    </section>
  );
};

export default Collections;

export const dynamic = "force-dynamic";

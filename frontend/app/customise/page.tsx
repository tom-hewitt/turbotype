import { Heading } from "../../components/heading";
import { Page } from "../../components/page";
import { Subheading } from "../../components/subheading";
import React from 'react';
import { Editor } from "./editor";

export default function Customise() {
  return (
    <Page colour="#FFABB0">
      <Heading>CUSTOMISE</Heading>
      <Subheading>Let's decorate your own car.</Subheading>
      <Editor />
    </Page>
  );
}

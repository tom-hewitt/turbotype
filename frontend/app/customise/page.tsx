import { Heading } from "../../components/heading";
import { Page } from "../../components/page";
import { Subheading } from "../../components/subheading";
import React from 'react';
import { Editor } from "./editor";
import { createClient } from "../../database/server";

export default async function Customise() {
  const supabase = createClient();

  const id = (await supabase.auth.getUser()).data.user?.id;

  if (!id) {
    return <h1>login first</h1>;
  }

  const { data } = await supabase.from("users").select("color").eq("id", id).single();

  return (
    <Page colour="#FFABB0">
      <Heading>CUSTOMISE</Heading>
      <Subheading>Let's decorate your own car.</Subheading>
      <Editor color={data!.color as string} />
    </Page>
  );
}

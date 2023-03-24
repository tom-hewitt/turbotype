import { Heading } from "../../components/heading";
import { Page } from "../../components/page";
import { Subheading } from "../../components/subheading";
import React from 'react';
import { Editor } from "./editor";
import { createClient } from "../../database/server";

export default async function Customise() {
  const supabase = createClient();

  // const { data } = await supabase.from("cosmetics").select("type, colour").eq("user_id", supabase.auth.user)

  return (
    <Page colour="#FFABB0">
      <Heading>CUSTOMISE</Heading>
      <Subheading>Let's decorate your own car.</Subheading>
      <Editor />
    </Page>
  );
}

import type { MetaFunction } from "@remix-run/node";
import { ReactElement } from "react";
import { Catan } from "app/catan";
import { Field } from "@components/Field";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index(): ReactElement {
  const field = Catan.generateEmptyField(3);

  return (
    <div className="h-screen w-screen">
      <Field {...field} />
    </div>
  );
}

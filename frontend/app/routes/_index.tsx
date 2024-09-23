import type { MetaFunction } from "@remix-run/node";
import { ReactElement, useEffect, useState } from "react";
import { Catan } from "app/catan";
import { Field } from "@components/Field";
import { SideBar } from "@components/SideBar";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function _index(): ReactElement {
  const [fieldSize, setFieldSize] = useState(1);
  const [field, setField] = useState(Catan.generateEmptyField(fieldSize));
  const [template, setTemplate] = useState(Catan.generateEmptyTemplate());

  useEffect(() => {
    setField(Catan.generateEmptyField(fieldSize));
  }, [fieldSize]);

  const onSubmit = () => {
    setField(Catan.generateValidField(field, template));
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      <div className="flex-shrink flex-grow">
        <Field field={field} onChange={setField} />
      </div>
      <div className="w-1/3 flex-shrink-0 border-l-2 border-black">
        <SideBar
          className="w-full"
          totalTilesCount={field.tiles.length}
          fieldSize={fieldSize}
          onSizeChange={setFieldSize}
          onTemplateChange={(t) => setTemplate({ ...template, ...t })}
          template={template}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

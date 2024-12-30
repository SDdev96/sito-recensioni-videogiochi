import React from "react";
import { Skeleton } from "antd";
import CustomForm from "./CustomForm";

const GameForm = ({ isPending, id, name }) => {
  return isPending ? (
    <div
      style={{
        width: "100%",
        height: "400px",
        margin: "0 auto",
        marginBottom: "40px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <Skeleton.Input
        active
        block
        style={{
          width: "70%",
          height: "50px",
          marginBottom: "20px",
        }}
      />
      <Skeleton.Input
        active
        block
        style={{
          height: "40px",
          marginBottom: "20px",
        }}
      />
      <Skeleton.Input
        active
        block
        size="small"
        style={{
          width: "30%",
          marginBottom: "20px",
        }}
      />
      <Skeleton.Input
        active
        block
        size="small"
        style={{
          width: "60%",
          marginBottom: "20px",
        }}
      />
      <Skeleton.Input
        active
        block
        style={{
          width: "100%",
          height: "100px",
          marginBottom: "20px",
        }}
      />
      <Skeleton.Button active block size="small" />
    </div>
  ) : (
    <CustomForm key={id} id={id} name={name} />
  );
};

export default GameForm;

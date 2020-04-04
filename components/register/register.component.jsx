import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Card,
  Button,
  Divider,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { MaskedInput } from "antd-mask-input";
import {
  inputField,
  inputFieldLabel,
  hospitalTypes,
  hospitalTypesLabel,
  THAI_PROVINCES,
} from "../../types";
import styles from "./register.module.scss";
import { StoreConnect } from "../../store/store";
import { updateField } from "../../store/register/register.actions";

import { postRequest } from "../../api/register";

const Register = ({ state, updateField }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const RequiredFieldRule = (text) => ({
    required: true,
    message: `กรุณากรอก${text}`,
  });
  const phoneRule = () => ({
    pattern: new RegExp(/^0[0-9]-[0-9]{4}-[0-9]{3}[0-9_]$/, "i"),
    message: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
  });
  const usernameRule = () => ({
    pattern: new RegExp(/^[0-9a-zA-Z_]*$/),
    message: "does not match ^[0-9a-zA-Z]*$",
  });
  const passwordRule = () => ({
    pattern: new RegExp(/.{8,}/),
    message: "len must >= 8",
  });
  const emailRule = () => ({
    pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    message: "not email",
  });

  const registerRequest = async () => {
    setLoading(true);
    await postRequest(state);
    router.push("/register-complete");
    setLoading(false);
  };

  return (
    <Card style={{ borderRadius: "10px" }}>
      <div>
        <h1>ลงทะเบียนเพื่อขอรับ Face shield</h1>
        <p>
          อธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย
          คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย
        </p>
      </div>
      <Divider />
      <Form layout="vertical" onFinish={registerRequest}>
        <Form.Item
          label={inputFieldLabel.name}
          name={inputField.name}
          rules={[RequiredFieldRule(inputFieldLabel.name)]}
          onChange={(e) => updateField(inputField.name, e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.hospitalName}
          name={inputField.hospitalName}
          rules={[RequiredFieldRule(inputFieldLabel.hospitalName)]}
          onChange={(e) => updateField(inputField.hospitalName, e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.hospitalType}
          name={inputField.hospitalType}
          rules={[RequiredFieldRule(inputFieldLabel.hospitalType)]}
          onChange={(e) => updateField(inputField.hospitalType, e.target.value)}
        >
          <Radio.Group>
            <Radio value={hospitalTypes.public}>
              {hospitalTypesLabel.public}
            </Radio>
            <Radio value={hospitalTypes.private}>
              {hospitalTypesLabel.private}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.faceShieldDemand}
          name={inputField.faceShieldDemand}
          rules={[RequiredFieldRule(inputFieldLabel.faceShieldDemand)]}
          onChange={(e) => updateField(inputField.faceShieldDemand, e.target.value)}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.province}
          name={inputField.province}
          rules={[RequiredFieldRule(inputFieldLabel.province)]}
          // onChange={(val) => updateField(inputField.province, val)}
        >
          <Select
            showSearch
            onChange={(val) => updateField(inputField.province, val)}
          >
            {THAI_PROVINCES.map((province) => (
              <Select.Option value={province}>{province}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.address}
          name={inputField.address}
          rules={[RequiredFieldRule(inputFieldLabel.address)]}
          onChange={(e) => updateField(inputField.address, e.target.value)}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.phoneNumber}
          name={inputField.phoneNumber}
          rules={[RequiredFieldRule(inputFieldLabel.phoneNumber), phoneRule()]}
          // onChange={e =>
          //   updateField(inputField.phoneNumber, e.target.value)
          // }
        >
          {/* <Input/> */}
          <MaskedInput
            mask="11-1111-1111"
            size="12"
            onChange={(e) => updateField(inputField.phoneNumber, e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.email}
          name={inputField.email}
          rules={[RequiredFieldRule(inputFieldLabel.email), emailRule]}
          onChange={(e) => updateField(inputField.email, e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.notice}
          name={inputField.notice}
          rules={[]}
          onChange={(e) => updateField(inputField.notice, e.target.value)}
        >
          <TextArea />
        </Form.Item>

        <Divider />
        <div>กรุณากรอกไอดีและพาสเวิร์ดเพื่อเข้าใช้งานครั้งต่อไป</div>

        <Form.Item
          label={inputFieldLabel.username}
          name={inputField.username}
          rules={[RequiredFieldRule(inputFieldLabel.username), usernameRule]}
          onChange={(e) => updateField(inputField.username, e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={inputFieldLabel.password}
          name={inputField.password}
          rules={[RequiredFieldRule(inputFieldLabel.password), passwordRule]}
          onChange={(e) => updateField(inputField.password, e.target.value)}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              ลงทะเบียน
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

const propsMapper = (store) => {
  const { state, dispatch } = store.register;
  return {
    updateField: (field, value) => {
      dispatch(updateField(field, value));
    },
    state,
  };
};

export default StoreConnect(propsMapper)(Register);

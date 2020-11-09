/*import React from "react";
import {
  Input,
  Stack,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";

const Form = (props) => {
  
  //        <InputLeftElement children={<Icon name="info" />} />
  
  return (
    <form>
      <Stack spacing={3}>
        <InputGroup>
          <InputLeftElement children={<Icon name="email" />} />
          <Input />
        </InputGroup>
        <Input />
        <Input />
        <Input />
      </Stack>
    </form>
  );
};

export default Form;
*/
import {
  Input,
  Stack,
  Icon,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  FormHelperText,
} from "@chakra-ui/core";
const Form = () => {
  return (
    <form action="submit">
      <Stack spacing={3}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<Icon name="email" />} />
            <Input type="email" placeholder="Email" aria-lable="Email" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<Icon name="lock" />} />
            <Input
              type="password"
              placeholder="Password"
              aria-lable="Password"
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          _active={{ boxShadow: "lg" }}
        >
          Login
        </Button>
        <FormHelperText textAlign="center">
          Welcome Home!
          <br />
          🏠
        </FormHelperText>
      </Stack>
    </form>
  );
};

export default Form;

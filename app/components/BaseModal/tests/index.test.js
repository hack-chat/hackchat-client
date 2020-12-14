/**
 * Base modal tests
 */

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  WideButton,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  WideDropdownToggle,
  WideDropdownMenu,
  WideDropdownItem,
  SmallDropdownToggle,
  InputGroup,
  Input,
  InputGroupAddon,
} from '../index';

describe('<BaseModal />', () => {
  it('should export a <Modal> class', () => {
    expect(Modal).not.toBeNull();
  });

  it('should export a <ModalHeader> class', () => {
    expect(ModalHeader).not.toBeNull();
  });

  it('should export a <ModalBody> class', () => {
    expect(ModalBody).not.toBeNull();
  });

  it('should export a <ModalFooter> class', () => {
    expect(ModalFooter).not.toBeNull();
  });

  it('should export a <Button> class', () => {
    expect(Button).not.toBeNull();
  });

  it('should export a <WideButton> class', () => {
    expect(WideButton).not.toBeNull();
  });

  it('should export a <Dropdown> class', () => {
    expect(Dropdown).not.toBeNull();
  });

  it('should export a <DropdownToggle> class', () => {
    expect(DropdownToggle).not.toBeNull();
  });

  it('should export a <DropdownMenu> class', () => {
    expect(DropdownMenu).not.toBeNull();
  });

  it('should export a <DropdownItem> class', () => {
    expect(DropdownItem).not.toBeNull();
  });

  it('should export a <WideDropdownToggle> class', () => {
    expect(WideDropdownToggle).not.toBeNull();
  });

  it('should export a <WideDropdownMenu> class', () => {
    expect(WideDropdownMenu).not.toBeNull();
  });

  it('should export a <WideDropdownItem> class', () => {
    expect(WideDropdownItem).not.toBeNull();
  });

  it('should export a <SmallDropdownToggle> class', () => {
    expect(SmallDropdownToggle).not.toBeNull();
  });

  it('should export a <InputGroup> class', () => {
    expect(InputGroup).not.toBeNull();
  });

  it('should export a <Input> class', () => {
    expect(Input).not.toBeNull();
  });

  it('should export a <InputGroupAddon> class', () => {
    expect(InputGroupAddon).not.toBeNull();
  });
});

import { EmailValidator } from '../email-validator';

describe('Email Validator', () => {
  it('should return true if email i a email valid', () => {
    const sut = new EmailValidator();
    const isEmailVaid = sut.isValid('some-mail@mail.com');
    expect(isEmailVaid).toBe(true);
  });

  it('should returns false if no email valid is provided', () => {
    const sut = new EmailValidator();
    const isEmailVaid = sut.isValid('some-mailmail.com');
    expect(isEmailVaid).toBe(false);
  })
});

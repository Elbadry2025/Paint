import { Factory } from './factory';

describe('Factory', () => {
  it('should create an instance', () => {
    expect(new Factory()).toBeTruthy();
  });
});

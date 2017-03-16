import { browser, element, by } from 'protractor';

describe('QuickStart Lib E2E Tests', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should display app', () => {
    expect(element(by.css('h1')).getText()).toEqual('Hello Angular');
  });

  it('should display lib', () => {
    expect(element(by.css('h2')).getText()).toEqual('Hello Angular Library');
  });

});

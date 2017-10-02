Feature: Codepoint search

    Scenario: Searching for a non-existant codepoint
        Given I am on the Home Page
        When I type "U+123456" in the search field
        Then There are 0 search results
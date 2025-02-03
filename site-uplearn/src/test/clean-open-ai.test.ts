import cleanOpenAi from "@/src/shared/util/ai/clean-open-ai";
import {
  complexResponse,
  simpleResponse,
  simpleResponseJson,
  complexResponseJson,
} from "@/src/server/mocks/ai/open-ai/learn-response.mock";

describe("cleanOpenAi", () => {
  it("should clean and parse valid JSON response", () => {
    const result = cleanOpenAi(simpleResponse);

    expect(result).toEqual(simpleResponseJson);
  });

  it("should clean and parse a comple JSON", () => {
    const result = cleanOpenAi(complexResponse);
    expect(result).toEqual(complexResponseJson);
  });

  it("should throw error for invalid JSON", () => {
    const invalidResponse = "```json invalid json ```";

    expect(() => cleanOpenAi(invalidResponse)).toThrow();
  });
});

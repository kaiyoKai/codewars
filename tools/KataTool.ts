import { writeFile } from "node:fs/promises";

function toPascalCase(str: string, delimeter: string): string {
  if (!str) return "";
  return str
    .split(delimeter)
    .map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}
//Example input: https://www.codewars.com/api/v1/code-challenges/directions-reduction
const CodeWarsUrls = {
  BASE_KATA: "https://www.codewars.com/kata/",
  BASE_API: "https://www.codewars.com/api/v1/code-challenges/",

  buildApiUrl: (slug: string) => `${CodeWarsUrls.BASE_API}${slug}`,
  buildKataUrl: (slug: string) => `${CodeWarsUrls.BASE_KATA}${slug}`,
} as const;

const SupportedFileTypes = {
  Javascript: "js",
  Typescript: "ts",
} as const;
type SupportedFileTypes =
  (typeof SupportedFileTypes)[keyof typeof SupportedFileTypes];

function isSupportedFileType(
  type: string | undefined,
): type is SupportedFileTypes {
  return Object.values(SupportedFileTypes).includes(type as SupportedFileTypes);
}

interface CommentStyle {
  start: string;
  prefix: string;
  end: string;
}

const CommentStyles: Record<SupportedFileTypes, CommentStyle> = {
  [SupportedFileTypes.Javascript]: {
    start: "/*",
    prefix: " * ",
    end: " */",
  },
  [SupportedFileTypes.Typescript]: {
    start: "/*",
    prefix: " * ",
    end: " */",
  },
};

interface KataResponse {
  name: string;
  slug: string;
  url: string;
  description: string;
  rank: {
    name: string;
  };
  languages: string[];
}

export class Katatool {
  constructor() {}
  extractSlug(input: string) {
    if (input == undefined) {
      throw new Error(`Parameter: "${input}" is undefined`);
    }

    return input.startsWith(CodeWarsUrls.BASE_KATA)
      ? input.split(CodeWarsUrls.BASE_KATA)[1].split("/")[0]
      : input;
  }

  async makeApiCall(input: string = process.argv[2], lang?: string) {
    if (input == undefined) {
      throw new Error(`Parameter: "${input}" is undefined`);
    }
    if (process.argv[3] != undefined) {
      lang = process.argv[3];
    }
    if (!isSupportedFileType(lang)) {
      throw new Error(
        `Parameter: "${lang}" is an unsupported filetype, Supported Filetypes: ${Object.values(SupportedFileTypes).join("\n")}`,
      );
    }

    lang = SupportedFileTypes.Typescript; //defaultValue/fallback

    const slug = this.extractSlug(input);
    const apiUrl = CodeWarsUrls.buildApiUrl(slug);
    const respone = await fetch(apiUrl);
    const data = (await respone.json()) as KataResponse;
    console.log(data);

    this.createFileFromKataResponse(data, lang as SupportedFileTypes);
  }

  async createFileFromKataResponse(
    kataResponse: KataResponse,
    lang: SupportedFileTypes,
  ) {
    const fileName = `${toPascalCase(kataResponse.slug, "-")}.${lang}`;
    try {
      await writeFile(
        `/home/kai/code/codewars/katas/${fileName}`,
        this.createTemplateForLang(kataResponse, lang),
        "utf8",
      );
      console.log("Datei wurde erfolgreich geschrieben!");
    } catch (fehler) {
      console.error("Fehler beim Schreiben der Datei:", fehler);
    }
  }
  formatComment(text: string, lang: SupportedFileTypes): string {
    const style = CommentStyles[lang];
    const formattedDescription = text
      .split("\n")
      .map((line: string) => {
        return ` ${style.prefix}${line}`;
      })
      .join("\n");
    return `${style.start}\n${formattedDescription}\n${style.end}`;
  }
  createTemplateForLang(kataRespone: KataResponse, lang: SupportedFileTypes) {
    const formattedDescription = this.formatComment(
      kataRespone.description,
      lang,
    );
    const template = `/*
     * ${kataRespone.name} (${kataRespone.rank.name})
     * ${kataRespone.url}
     *
    ${formattedDescription}
     */
    export function solution() {
      // TODO: Implementieren
    }
    `;
    return template;
  }
}

new Katatool().makeApiCall();

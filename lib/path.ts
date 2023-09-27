/** Utils to work with URL paths */
namespace Path {
  export type Type = `/${string}`

  export type Parameter<T extends string = string> = `[${T}]`;

  /** Takes in any string and returns a string that starts with a `"/"` */
  export type fromString<T extends string> = T extends Path.Type ? T : `/${T}`

  export type getNextSegment<
    FullPath extends Path.Type,
    CurrentPath extends Path.Type | null = null
  > = FullPath extends `${CurrentPath extends null ? '' : CurrentPath}/${infer U}`
    // Check if there are subpaths
    ? U extends `${infer Z}/${string}`
    ? Z // Return the segment before the subparts
    : U
    : never

  // Appends the given `Segment` to the given path `T`
  export type join<
    P extends Path.Type | null,
    Segment extends string,
  > = Path.fromString<`${P extends null ? '' : P}${Path.fromString<Segment>}`>


  /** Parses the parameters from the given URL path string */
  export type getParams<T extends Path.Type> = T extends `${infer A}/[${infer Param}]${infer B}`
    ?
    | (
      Param extends `...${string}`
      // If it's a catch-all it's allowed to be any string
      ? (string & {})
      : Param
    )
    // Recursively parse the path
    | getParams<Path.fromString<`${A}${B}`>>
    : never
}


export const USER = 'username';
export const OPERATION_FAILED = 'Operation Failed!';
export const INVALID_INPUT = 'Invalid input';

export const OP_UP = 'up';
export const OP_CD = 'cd';
export const OP_LS = 'ls';
export const OP_CAT = 'cat';
export const OP_ADD = 'add';
export const OP_RN = 'rn';
export const OP_CP = 'cp';
export const OP_MV = 'mv';
export const OP_RM = 'rm';
export const OP_OS = 'os';
export const OP_HASH = 'hash';
export const OP_COMPRESS = 'compress';
export const OP_DECOMPRESS = 'decompress';

export const NWD_OPERATIONS = [OP_UP, OP_CD, OP_LS];
export const FS_OPERATIONS = [OP_CAT, OP_ADD, OP_RN, OP_CP, OP_MV, OP_RM];
export const OS_OPERATIONS = [OP_OS];
export const HASH_OPERATIONS = [OP_HASH];
export const ZIP_OPERATIONS = [OP_COMPRESS, OP_DECOMPRESS];

export const WITH_2_ARGUMENTS = [OP_RN, OP_CP, OP_MV, OP_COMPRESS, OP_DECOMPRESS];

export const OS_EOL = '--EOL';
export const OS_CPUS = '--cpus';
export const OS_HOMEDIR = '--homedir';
export const OS_USERNAME = '--username';
export const OS_ARCHITECTURE = '--architecture';

export const OS_ARGUMENTS = [
  OS_EOL, OS_CPUS, OS_HOMEDIR, OS_USERNAME, OS_ARCHITECTURE
];

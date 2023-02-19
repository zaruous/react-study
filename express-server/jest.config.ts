import type {Config} from 'jest';

/**
 * jest 설정을 늘린다.
 * testTimeout 테스트 타임 아웃 시간을 늘린다. 디폴트는 5초
 */
export default async (): Promise<Config> => {
    return {
        verbose: true,
        testTimeout : 30000
    };
};
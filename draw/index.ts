import crypto, { ScryptOptions } from 'crypto';
import { codeList } from './codeList';
import { saltList } from './saltList';

// 유효한 모든 공개 코드를 사전식 순서로 정렬한 다음, 공백 없이 이어 붙인 것
saltList.push(codeList.map(c => c.normalize('NFC').trim()).sort().join(''));

const salt: Buffer = Buffer.from(saltList.join(''), 'utf8');

// Node.js 기본값입니다. 미래에 변경될 것을 대비하여 고정해 둡니다.
const scryptOptions: ScryptOptions = {
    cost: 16384,
    blockSize: 8,
    parallelization: 1,
    maxmem: 32 * 1024 * 1024,
};

// 추첨 결과 계산
const result = codeList.map(code => {
    // scrypt 처리
    const key = crypto.scryptSync(
        Buffer.from(code, 'utf8'),
        salt,
        32,
        scryptOptions
    ).toString('hex');

    // scrypt 결과를 키로 하여 사전식 순서로 정렬합니다.
    return { key, code };
}).sort((a, b) => a.key.localeCompare(b.key));

// 추첨 결과 출력
result.forEach(({ key, code }) => {
    // 당첨 순위가 높은 코드가 먼저 출력됩니다.
    console.log(`${key}\t${code}`);
});

// 예제 출력입니다. 1위는 ea5dd2cb61c77f76408fb503c5c60292f1cc56ce7d89224d6e11c991ed9a4b23입니다.

// 1914048c83fbf62c6532c84d588118a952874ed2d817b7dc223ef278024c8b04	ea5dd2cb61c77f76408fb503c5c60292f1cc56ce7d89224d6e11c991ed9a4b23
// bedaabdcd9848bc4521cf1fde1450f0d2d663ad8df3a0c37287e1b024e5a4dff	f16a306193ec9d6c086500ba63179ec87e059d93bee6d2e56b4b8af8656b4f8f
// ca19b702d991b208c72bff80f030535239b46a83f1ef48cfb8667aa3c9cbb0a4	44d10b1bae529cb187e57a57bb80424353b228af41800edaff48359e1b3bfa76
// d8254b315140f4b4de5aa5d067ffb8386933c52c208b897117ea31596969ae63	0e9a95d3df73ada4b984369e3c392af2c1e823d52d7b2d8fef7b71fb75ef6e84
// e1685aefb48624dd4c589727c30fbec9156693b67d5e7938c52dc98886f739e0	1a2563750ff2dbdf5228f37b9cf1d6630bf1fbf79d73a0019623f98417ee4946

import crypto, { ScryptOptions } from 'crypto';

// 예제 데이터입니다.
const codes: string[] = [
    'ea5dd2cb61c77f76408fb503c5c60292f1cc56ce7d89224d6e11c991ed9a4b23',
    '0e9a95d3df73ada4b984369e3c392af2c1e823d52d7b2d8fef7b71fb75ef6e84',
    '44d10b1bae529cb187e57a57bb80424353b228af41800edaff48359e1b3bfa76',
    '1a2563750ff2dbdf5228f37b9cf1d6630bf1fbf79d73a0019623f98417ee4946',
    'f16a306193ec9d6c086500ba63179ec87e059d93bee6d2e56b4b8af8656b4f8f',
];

// 예제 데이터입니다.
const saltList: string[] = [
    '1000', // 하나은행 USD 최종 매매기준율
    '1000', // 하나은행 EUR 최종 매매기준율
    '1000', // 하나은행 JPY 100 최종 매매기준율
    '1000', // 하나은행 CNY 최종 매매기준율
    '1000', // 하나은행 GBP 최종 매매기준율
    '1000', // KOSPI 종가
    '1000', // KODEX 200(유가증권시장 69500) 종가
    '1000', // KODEX 레버리지(유가증권시장 122630) 종가
    '1000', // TIGER 200(유가증권시장 102110) 종가
    '1000', // 삼성전자(유가증권시장 005930) 종가
    '1000', // SK하이닉스(유가증권시장 000660) 종가
    '1000', // LG화학(유가증권시장 051910) 종가
    '1000', // 삼성전자우(유가증권시장 005935) 종가
    'cfeFbOA251umnIqprT8xlqx11ZzTuv63V4uesU8ciRXHHq38YsC0AHivGRvkts2q',
];

// 유효한 모든 공개 코드를 사전식 순서로 정렬한 다음, 공백 없이 이어 붙인 것
saltList.push(codes.sort().join(''));

const salt: Buffer = Buffer.from(saltList.join(''), 'utf8');

const scryptOptions: ScryptOptions = {
    cost: 16384,
    blockSize: 8,
    parallelization: 1,
    maxmem: 32 * 1024 * 1024,
};

// 추첨
const result = codes.map(code => {
    const key = crypto.scryptSync(
        Buffer.from(code, 'utf8'),
        salt, 32, scryptOptions
    ).toString('hex');
    return { key, code };
}).sort((a, b) => a.key.localeCompare(b.key));

// 추첨 결과 출력
result.forEach(({ key, code }) => {
    console.log(`${key}\t${code}`);
});

// 예상 출력
// 13b243ca9bc57b527c2a8ce6c37209eff303d4d08fa485c6b88dfae8fb674cfd	ea5dd2cb61c77f76408fb503c5c60292f1cc56ce7d89224d6e11c991ed9a4b23
// 28444a39fcbd5f5f56e1767de2d02cea9899d844681f0151c2f0d908d884d1f5	44d10b1bae529cb187e57a57bb80424353b228af41800edaff48359e1b3bfa76
// d18c2e514c7d0c45d3dc0ee0dbaf53e58c86b21168475528157b93940e01dc96	0e9a95d3df73ada4b984369e3c392af2c1e823d52d7b2d8fef7b71fb75ef6e84
// e4ddd5583235857d1cbb23f26451671733730e95d2354e8c16f66084068b8e12	f16a306193ec9d6c086500ba63179ec87e059d93bee6d2e56b4b8af8656b4f8f
// f9ecd7ae4c461fcf3406bcc022c92fde6d576e172a49bb1b0effc5bd40aab143	1a2563750ff2dbdf5228f37b9cf1d6630bf1fbf79d73a0019623f98417ee4946

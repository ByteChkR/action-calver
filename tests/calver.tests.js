const Calver = require('../src/calver.js');

describe('dates', () => {
  test('makeVersion : start of month', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef: 'refs/heads/main',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-10-01').toUTCString();
    const expected = {
      VersionFull: '22.10.1.1',
      VersionShort: '22.10.1.1',
      PrereleseSuffix: '',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });
  test('makeVersion : end of month', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef: 'refs/heads/main',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-10-31').toUTCString();
    const expected = {
      VersionFull: '22.10.31.1',
      VersionShort: '22.10.31.1',
      PrereleseSuffix: '',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });
  test('makeVersion : start of year', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef: 'refs/heads/main',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-01-01').toUTCString();
    const expected = {
      VersionFull: '22.1.1.1',
      VersionShort: '22.1.1.1',
      PrereleseSuffix: '',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });
  test('makeVersion : end of year', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef: 'refs/heads/main',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-12-31').toUTCString();
    const expected = {
      VersionFull: '22.12.31.1',
      VersionShort: '22.12.31.1',
      PrereleseSuffix: '',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });
});

describe('formatting', () => {
  test.each([
    { testdate: '2022-01-01', testformat: 'YY.M.D', expected: '22.1.1.1' },
    { testdate: '2022-10-01', testformat: 'YY.M.D', expected: '22.10.1.1' },
    { testdate: '2022-12-31', testformat: 'YY.M.D', expected: '22.12.31.1' },

    { testdate: '2022-01-01', testformat: 'YY.MDD', expected: '22.101.1' },
    { testdate: '2022-10-01', testformat: 'YY.MDD', expected: '22.1001.1' },
    { testdate: '2022-12-31', testformat: 'YY.MDD', expected: '22.1231.1' },

    { testdate: '2022-01-01', testformat: 'YYMM.D', expected: '2201.1.1' },
    { testdate: '2022-10-01', testformat: 'YYMM.D', expected: '2210.1.1' },
    { testdate: '2022-12-31', testformat: 'YYMM.D', expected: '2212.31.1' },
  ])(
    'formatting : "$testdate" with format "$testformat" should be "$expected"',
    async ({ testdate, testformat, expected }) => {
      const options = {
        defaultBranch: 'refs/heads/main',
        currentRef: 'refs/heads/main',
        buildNumber: 1,
        prefix: '',
        format: testformat,
      };
      const date = new Date(testdate).toUTCString();
      const sut = new Calver(date, options);
      await sut.makeVersion();
      expect(sut.VersionFull).toBe(expected);
    }
  );
});

describe('prerelease', () => {
  test('makeVersion : for default branch', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef: 'refs/heads/main',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-01-01').toUTCString();
    const expected = {
      VersionFull: '22.1.1.1',
      VersionShort: '22.1.1.1',
      PrereleseSuffix: '',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });

  test('makeVersion : for nondefault branch', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef: 'refs/heads/some-new-feature',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-01-01').toUTCString();
    const expected = {
      VersionFull: '22.1.1.1-some-new-feature',
      VersionShort: '22.1.1.1',
      PrereleseSuffix: 'some-new-feature',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });
  test('makeVersion : for long nondefault branch', async () => {
    const options = {
      defaultBranch: 'refs/heads/main',
      currentRef:
        'refs/heads/some-new-feature-with-a-really-long-name-that-should-be-trimmed',
      buildNumber: 1,
      prefix: '',
      format: 'YY.M.D',
    };
    const date = new Date('2022-01-01').toUTCString();
    const expected = {
      VersionFull: '22.1.1.1-some-new-feature-wit',
      VersionShort: '22.1.1.1',
      PrereleseSuffix: 'some-new-feature-wit',
    };

    const sut = new Calver(date, options);
    await sut.makeVersion();
    expect(sut.VersionFull).toBe(expected.VersionFull);
    expect(sut.VersionShort).toBe(expected.VersionShort);
    expect(sut.PrereleseSuffix).toBe(expected.PrereleseSuffix);
  });
  test('makeVersion : for multiple default branches', async () => {
    const options1 = {
      defaultBranch: 'refs/heads/main|refs/heads/master',
      currentRef:
        'refs/heads/master',
      buildNumber: 1,
      prefix: '',
      format: 'YYYY.MM.DD',
    };
    const options2 = {
      defaultBranch: 'refs/heads/main|refs/heads/master',
      currentRef:
        'refs/heads/main',
      buildNumber: 1,
      prefix: '',
      format: 'YYYY.MM.DD',
    };
    const options3 = {
      defaultBranch: 'refs/heads/main|refs/heads/master',
      currentRef:
        'refs/heads/dev',
      buildNumber: 1,
      prefix: '',
      format: 'YYYY.MM.DD',
    };

    const date = new Date('2022-01-01').toUTCString();
    const expected1 = {
      VersionFull: '2022.01.01.1',
      VersionShort: '2022.01.01.1',
      PrereleseSuffix: '',
    };
    const expected2 = {
      VersionFull: '2022.01.01.1',
      VersionShort: '2022.01.01.1',
      PrereleseSuffix: '',
    };
    const expected3 = {
      VersionFull: '2022.01.01.1-dev',
      VersionShort: '2022.01.01.1',
      PrereleseSuffix: 'dev',
    };

    const sut1 = new Calver(date, options1);
    await sut1.makeVersion();
    expect(sut1.VersionFull).toBe(expected1.VersionFull);
    expect(sut1.VersionShort).toBe(expected1.VersionShort);
    expect(sut1.PrereleseSuffix).toBe(expected1.PrereleseSuffix);

    const sut2 = new Calver(date, options2);
    await sut2.makeVersion();
    expect(sut2.VersionFull).toBe(expected2.VersionFull);
    expect(sut2.VersionShort).toBe(expected2.VersionShort);
    expect(sut2.PrereleseSuffix).toBe(expected2.PrereleseSuffix);

    const sut3 = new Calver(date, options3);
    await sut3.makeVersion();
    expect(sut3.VersionFull).toBe(expected3.VersionFull);
    expect(sut3.VersionShort).toBe(expected3.VersionShort);
    expect(sut3.PrereleseSuffix).toBe(expected3.PrereleseSuffix);
  });
});

describe('errors', () => {
  test.each([
    {
      testdate: undefined,
      testoptions: {},
      expectederror: 'No date has been provided.',
    },
    {
      testdate: null,
      testoptions: {},
      expectederror: 'No date has been provided.',
    },
    {
      testdate: '2022-01-01',
      testoptions: null,
      expectederror: 'No options have been provided.',
    },
    {
      testdate: '2022-01-01',
      testoptions: undefined,
      expectederror: 'No options have been provided.',
    },
    {
      testdate: '2022.01.01',
      testoptions: { format: '' },
      expectederror: 'No format string has been provided.',
    },
  ])(
    'exception thrown : "$testdate" and "$testoptions" should throw "$expectederror"',
    async ({ testdate, testoptions, expectederror }) => {
      try {
        const sut = new Calver(testdate, testoptions);
        await sut.makeVersion();
      } catch (e) {
        expect(e).toEqual({
          message: expectederror,
        });
      }
    }
  );
});

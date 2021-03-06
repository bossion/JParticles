const {utils, Base} = JParticles;
const {random, abs, PI} = Math;
const twicePI = PI * 2;
const {
    pInt, limitRandom, calcSpeed,
    readOnly
} = utils;

@readOnly('snow')
class Snow extends Base {

    static defaultConfig = {

        // 雪花颜色
        color: '#fff',
        maxR: 6.5,
        minR: .4,
        maxSpeed: .6,
        minSpeed: .1
    };

    get version() {
        return '2.0.0';
    }

    constructor(selector, options) {
        super(Snow, selector, options);
    }

    init() {
        this.dots = [];
        this.createDots();
        this.draw();
    }

    snowShape() {
        const {maxR, minR, maxSpeed, minSpeed} = this.set;
        const r = limitRandom(maxR, minR);

        return {
            r,
            x: random() * this.cw,
            y: -r,
            vx: calcSpeed(maxSpeed, minSpeed),

            // r 越大，设置垂直速度越快，这样比较有近快远慢的层次效果
            vy: abs(r * calcSpeed(maxSpeed, minSpeed)),
            color: this.color()
        };
    }

    createDots() {

        // 随机创建 0-6 个雪花
        let count = pInt(random() * 6);
        while (count--) {
            this.dots.push(this.snowShape());
        }
    }

    draw() {
        const {cxt, cw, ch, paused} = this;
        const {opacity} = this.set;

        cxt.clearRect(0, 0, cw, ch);
        cxt.globalAlpha = opacity;

        this.dots.forEach((dot, i, array) => {
            const {x, y, r} = dot;

            cxt.save();
            cxt.beginPath();
            cxt.arc(x, y, r, 0, twicePI);
            cxt.fillStyle = dot.color;
            cxt.fill();
            cxt.restore();

            if (!paused) {
                dot.x += dot.vx;
                dot.y += dot.vy;

                // 雪花反方向飘落
                if (random() > .99 && random() > .5) {
                    dot.vx *= -1;
                }

                // 雪花从侧边出去，删除再添加
                if (x < 0 || x - r > cw) {
                    array.splice(i, 1, this.snowShape());

                    // 雪花从底部出去，删除
                } else if (y - r > ch) {
                    array.splice(i, 1);
                }
            }
        });

        // 添加雪花
        if (!paused && random() > .9) {
            this.createDots();
        }

        this.requestAnimationFrame();
    }
}
/*
  在这里添加、删除或修改作品。视频文件放进 videos/ 文件夹后，
  将 src 改为例如 "videos/my-film.mp4"；外部作品可使用 Vimeo、Bilibili 或 YouTube 链接。
*/
const projects = [
  { title: "把风夹在身边", category: "AIGC", year: "2026", duration: "01:12", cover: "covers/wind-film.jpg?v=20260720-wind3", src: "videos/wind-film.mp4", problem: "产品内容齐全，但品牌缺少让人停留的情绪记忆。", deliverable: "品牌短片 / 氛围影像 / 社媒内容", description: "以节奏、留白和情绪画面补足品牌表达，让内容不只说明产品，也建立被记住的理由。" },
  { title: "多米拉 S1 烤箱", category: "实拍", year: "2026", duration: "01:11", cover: "covers/domira-oven.jpg?v=20260720-domira3", src: "videos/domira-oven.mp4", problem: "专业设备参数多，用户难在短时间内理解产品价值。", deliverable: "主图视频 / 功能节奏剪辑 / 详情页素材", description: "以产品结构、操作细节与真实使用场景建立认知，让核心卖点在第一屏就被看见。" },
  { title: "肉松小贝制作", category: "实拍", year: "2026", duration: "02:05", cover: "covers/rousong-xiaobei.jpg?v=20260720-cover2", src: "videos/rousong-xiaobei.mp4", problem: "食品内容缺乏过程信任感，成品优势不够直观。", deliverable: "制作过程 / 食材特写 / 成品氛围镜头", description: "从原料到成品连续呈现，用细节放大口感、工艺与新鲜感，让食欲成为购买理由。" },
  { title: "悦乐厨烤箱 · 成品展示", category: "实拍结合 AI", year: "2026", duration: "00:57", cover: "covers/yuele-oven.jpg?v=20260720-cover2", src: "videos/yuele-oven.mp4", problem: "设备功能抽象，消费者看不见最终能得到什么。", deliverable: "成品展示 / 产品关联镜头 / 主图短片", description: "将镜头重心放在烘焙成果，让设备性能最终落为可感知、可想象的成品价值。" },
  { title: "老面醒发箱", category: "AIGC", year: "2026", duration: "00:46", cover: "covers/proofing-cabinet.jpg?v=20260720-proofing3", src: "videos/proofing-cabinet.mp4", problem: "商用设备应用复杂，潜在客户缺少使用场景联想。", deliverable: "场景演示 / 操作流程 / 功能卖点素材", description: "以真实工序串联设备功能，降低理解门槛，并把专业能力转化为可信赖的使用体验。" },
  { title: "百城切肉机", category: "实拍结合 AI", year: "2026", duration: "00:52", cover: "covers/meat-slicer.jpg?v=20260720-cover2", src: "videos/meat-slicer.mp4", problem: "同类设备外观趋同，效率与可靠性没有被有效表达。", deliverable: "性能演示 / 操作特写 / 电商详情素材", description: "通过切割动作、结构细节与结果对比，建立一台商用设备应有的效率感和可靠感。" },
];

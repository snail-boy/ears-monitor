#!/bin/bash
from="src"
to="html"
type="docx"

# 检测brew
if ! command -v brew >/dev/null 2>&1; then
    echo "brew没有安装，请安装"
    exit 0
fi
# 检测pandoc
if ! command -v pandoc >/dev/null 2>&1; then
    brew install pandoc
fi

#  检测 from
if [ ! -d $from ]; then
    echo "src不存在"
    exit 0
fi

# 检测 to
if [ ! -d $to ]; then
    mkdir $to
fi

# 检测src下是否含有docx
count=$(ls $from | grep ${type} | wc -l)

if [ $count == 0 ]; then
 echo "src为空, 请放置文档到src目录下"
 exit 0
fi

cd $from

list=$(ls | grep ${type})

for doc in $list
    do
        pandoc -s ${doc} -t html -o ${doc/${type}/html}
        mv ${doc/${type}/html} "../${to}"
    done

echo "src下所有的docx文件转换成html成功"

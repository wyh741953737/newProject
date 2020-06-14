git是目前世界上最先进的分布式版本控制系统。 git和其他版本控制系统不同处：缓存区的概念

分布式管理系统和集中式管理系统区别：
    分布式：每个人电脑上都是一个完整的版本库，不需要联网。如何协同工作？你修改了A文件，他也改了A，这时候只需要把各自的修改推送给彼此就可以看到修改地方。
    集中式：版本库存放在中央服务器，干活的时候先从中央服务器取得最新版本，然后开始干活。活干完了再推送到中央服务器。集中式版本控制最大毛病就是要联网才能工作。
SVN和Git对比：
    1：管理方式：
        SVN采用增量管理方式，每次只保存修改的，再和之前的拼接
        git采取对文件系统的快照方式。
    2：联网：
        SVN需要联网，git不需要
    git独有：对团队外开发者贡献的代码进行审核。
git优势：
        大部分操作在本地完成，不需要联网
        完整性保证
        尽可能添加数据而不是删除或修改数据
        分支操作非常快捷流畅
        与Linux命令全面兼容
git在本地有三个地区：工作区（写代码）--git add-暂存区（临时存储）--git commit ---本地库（历史版本）
git和代码托管中心：
    局域网：GitLab服务器
    外网环境：github，码云
本地库和远程库：
    团队内部协作：本地库（pull可以把远程的代码拉下来）---远程库（clone下了修改，加入团队后可以push）
    跨团队协作：通过fork去复制另一个远程库B，团队外的人clone下了push到B，B通过pull request请求，A审核，没问题A去merge，团队内的人就pull

git保存版本的机制：
    集中式版本控制工具的文件管理机制：
        以文件变更列表的方式存储信息，这类系统将他们保存的信息看做一组基本文件和每个文件随时间逐渐累积的结果。
    git文件管理机制：
        git把数据看作小型文件系统的一组快照，每次提交更新时git都会对当前的全部文件制作一个快照并保存这个快照的索引，若文件未修改，git不再重复存储该文件，而是保留一个链接指向之前存储的文件，所以git的工作方式可以称为快照流。
    git分支管理：创建分支是创建新的指针，切换分支是切换指针的指向位置，所以效率高。

解决冲突：要点
        若不是基于github远程库的最新版本所做的修改，不能推送，必须先拉取
        拉去下来若进入冲突状态，则按照“分支冲突解决”操作解决即可

git工作流
    1：集中式工作流：
        像SVN一样，以中央仓库为项目所有修改的单点实体，所有修改都提交到master分支上。这种方式与SVN的主要区别就是开发人员有本地库，git很大特性并没有用到。
    2：Gitflow工作流：
        通过为功能开发，发布准备和维护设立了独立的分支，让发布迭代过程更流畅，严格的分支模型也为大型项目提供了一些非常必要的结构。
        分支：主分支master，开发分支develop，bug修复分支hotfix。功能分支feature
    3:Forking工作流：
        是在GitFlow基础上，充分利用了git的Fork和pull request的功能以达到代码审核的目的，更适合安全地管理大团队的开发者，而且能接收不信任贡献者的提交。



安装完成后找到git-git-bash
设置签名（区分不同开发人）保存在.git/config文件下：
     git config --global user.name"yourname"
     git config --global user.email"youremail.com"

工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

创建版本库
1：mkdir gitdir
2：cd gitdir
3：pad显示当前目录
4：git init命令把这个目录变成Git可以管理的仓库

git remote add origin https://github.com/wyh741953737.git
git add把文件添加进去，实际上就是把文件修改添加到暂存区；
git commit提交更改，实际上就是把暂存区stage的所有内容提交到当前分支。

feach把远程下载到本地
pull=fetch+merge


SSH登录
    ssh -keygen -t rsa -C wyh777@qq.com
    进入.ssh目录，复制ssh，然后粘贴到远程。


场景1：想直接丢弃工作区的修改时，git checkout -- file。

场景2：你不但改乱了工作区某个文件内容，还加到了暂存区时，想丢弃修改，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

查看历史记录：
    git log --oneline显示一行日志。多屏显示控制方式：空格向下翻页，b向上翻页，q退出
    git reflog  HEAD@{移到当前版本需要多少步}
    历史记录的回退前进：
        基于索引值:HEAD指向当前记录，git reset --hard 9a9ebe0（这是部分索引值）
        使用^只能后退：git reset --hard HEAD^往后退一步， git reset --head HEAD^^^退三步
        使用~只能后退 git reset --hard HEAD~3
1：git reflog
2：git reset --hard 4e3e1

reset三个参数：
    --head在本地库移动HEAD指针，重置暂存区，重置工作区。三个地区一起动。
    --soft仅仅在本地库移动至指针
    --mixed在本地库移动HEAD指针，重置暂存区
删除文件：删除或者创建的记录不可磨灭，所以你可以找回
    rm a.text
    前提：删除前，文件提交到了本地库：git reset --head[指针位置]
    操作：1：删除操作已经提交到了本地库，指针位置指向历史记录
         2：删除操作尚未提交到本地库，指针位置使用HEAD
比较文件差异：
    git diff a.text 将工作区文件和暂存区的比较difference
    git diff [本地库中历史版本][文件名] 将工作区文件和本地库历史比较difference
分支：使用多条线推进工作
    master上线之前不想污染他就创建新分支，之后合并分支。
    好处？1：同时并行推进多个功能开发，提高开发效率。2：各个分指在开发过程中独立，某个分支失败，不影响其他分支。
hot_fix热修复分支
    创建分支：git branch 分支名
    查看分支：git branch -v
    切换分支：git checkout 分支名
    合并分支：切换到接收修改的分支上 git checkout 被合并分支名
            git merge 有新内容的分支名
解决合并冲突：
    1：编辑文件删除特殊符号，
    2：把文件修改到满意程度，保存退出
    3：git add 
    4：git commit -m “日志信息”
    

哈希：加密算法：
    明文-----加密算法-------密文
    不同哈希算法虽然加密强度不同，但是有以下特点：
        1：不管输入的数据量有多大，输入同一个哈希算法，得到的加密结果长度固定
        2：哈希算法确定，输入数据确定，输出数据能够包证不变
        3：哈希算法确定，输入数据变化，输出数据一定变化，而且变化很大
        4：哈希算法不可逆
        哈希算法可以验证文件是否完整。下载的文件通过哈希算法得到结果对比下载之前的哈希算法结果
        git底层采用的是SHA-1算法

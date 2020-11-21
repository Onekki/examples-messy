package com.onekki.ohmysite.core.mp;

import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MpGenerator {

    private static final String AUTHOR = "onekki";
    private static final String BASE_PACKAGE = "com.onekki.ohmysite";
    private static final String DB_HOST_PORT = "39.107.230.35:3306";
    private static final String DB_NAME = "site";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456";
    private static final boolean IS_MODULE_MODE = true;

    private static GlobalConfig getGlobalConfig() {
        GlobalConfig gc = new GlobalConfig();
        gc.setAuthor(AUTHOR)
                .setOutputDir(System.getProperty("user.dir") + "/src/main/java")
                .setFileOverride(false);
        return gc;
    }
    private static DataSourceConfig getDataSourceConfig() {
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://" + DB_HOST_PORT + "/" +DB_NAME + "?useUnicode=true&characterEncoding=UTF-8&useSSL=false")
                .setUsername(DB_USERNAME)
                .setPassword(DB_PASSWORD)
                .setDriverName("com.mysql.cj.jdbc.Driver");
        return dsc;
    }

    private static PackageConfig getPackageConfig(String moduleName) {
        PackageConfig pc = new PackageConfig();
        if (IS_MODULE_MODE) {
            pc.setParent(BASE_PACKAGE + ".module")
                    .setModuleName(moduleName);
        } else {
            pc.setParent(BASE_PACKAGE)
                    .setController("controller")
                    .setEntity("entity")
                    .setMapper("mapper")
                    .setService("service")
                    .setServiceImpl("service.impl");
        }
        return pc;
    }

    private static InjectionConfig getInjectionConfig() {
        // 如果模板引擎是 freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        // 如果模板引擎是 velocity
        // String templatePath = "/templates/mapper.xml.vm";
        List<FileOutConfig> focList = new ArrayList<>();
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return System.getProperty("user.dir") + "/src/main/resources/mapper"
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });

        InjectionConfig ic = new InjectionConfig() {
            @Override
            public void initMap() {

            }
        };
//        ic.setFileOutConfigList(focList);
        return ic;
    }

    private static StrategyConfig getStrategyConfig(String tablePrefix, String[] tables) {
        StrategyConfig sc = new StrategyConfig();
        sc.setNaming(NamingStrategy.underline_to_camel)
                .setColumnNaming(NamingStrategy.underline_to_camel)
                .setEntityLombokModel(false)
                .setRestControllerStyle(true)
                .setTablePrefix(tablePrefix);

        if (!tables[0].equals("y")&&!tables[0].equals("Y")) {
            sc.setInclude(tables);
        }
        return sc;
    }

    public static void main(String[] args) {
        String tablePrefix = scanner("需要去除的前缀(N/n=没有前缀):");
        if (tablePrefix.equals("N")||tablePrefix.equals("n")) {
            tablePrefix = "";
        }
        String moduleName = "";
        if (IS_MODULE_MODE) {
            moduleName = scanner("模块名:");
        }
        String tablesStr = scanner("表名(Y/y=所有表), 英文逗号分割表名:");
        String[] tables = tablesStr.split(",");
        new AutoGenerator()
                .setGlobalConfig(getGlobalConfig())
                .setPackageInfo(getPackageConfig(moduleName))
                .setDataSource(getDataSourceConfig())
                .setCfg(getInjectionConfig())
                .setStrategy(getStrategyConfig(tablePrefix, tables))
                .setTemplateEngine(new FreemarkerTemplateEngine())
                .execute();
    }

    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        System.out.println(tip);
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotEmpty(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }
}
